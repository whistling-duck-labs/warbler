const shell = require('shelljs')
const path = require('path')
const diff = require('immutablediff')
const {fromJS} = require('immutable')
const Sequelize = require('sequelize')
const store = require('../src/store')

// Regexp to get model key inside runmigrations .map
export const regex = {
  modelKey: /\/(\d+)/,
  attributeKey: /attributes\/(\d+)/
}
// Required because of bug with electron and shelljs
shell.config.execPath = shell.which('node')


/******************HELPER FUNCTIONS *******************/
const createConfigFiles = (directory, dbName, migrationFolderPath) => {
  //import config data. We don't need username and password as long as password is null
  const modelsPath = path.resolve(directory, 'models')
  shell.mkdir(path.resolve(directory, 'config'))
  shell.rm(path.resolve(directory, 'config', 'config.json'))
  const configPath = path.resolve(directory, 'config', 'config.json')
  const config = `{
    "development": {
      "database": "${dbName}",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
  }` //consider JSON.stringify
  // rewrite sequelizerc file
  shell.rm(`.sequelizerc`)
  shell.touch(`.sequelizerc`)
  shell.echo(`const path = require('path')\nmodule.exports = {'config': '${configPath}',\n  'models-path': '${modelsPath}',\n  'migrations-path': '${migrationFolderPath}'\n}`).to(`.sequelizerc`)
  // setup config file with db credentials
  shell.echo(config).to(configPath)
}

export const getMigrationAction = (op, changePath) => {
  if (changePath.includes('attributes')) {
    // for column actions
    switch (op) {
      case 'add':
        return 'addColumn'
      case 'remove':
        return 'removeColumn'
      case 'replace':
        return changePath.includes('name') ? 'renameColumn' : 'changeColumn'
      default:
        return new Error(`migration type error, with operation ${op} and path ${changePath}`)
    }
  } else {
    // for table actions
    switch (op) {
      case 'add':
        return 'createTable'
      case 'remove':
        return 'dropTable'
      case 'replace':
        return 'renameTable'
      default:
        throw new Error(`migration type error, with operation ${op} and path ${changePath}`)
    }
  }
}

export const getListOfChanges = (db, targetDb) => {
  return diff(db, targetDb)
  // ignore changes to nextKey value
  .filter(changeMap => !(changeMap.get('path').includes('nextAttributeKey') || changeMap.get('path').includes('nextModelKey')))
  .map(changeMap => {
    const op = changeMap.get('op')
    const changePath = changeMap.get('path')
    const modelKey = changePath.match(regex.modelKey)[1]
    let modelName
    if (op === 'remove' || op === 'replace') {
      modelName = db.get(modelKey).get('name')
    }
    else { // op is 'add'
      modelName = targetDb.get(modelKey).get('name')
    }
    const attributeKey = changeMap.get('path').match(regex.attributeKey) ? changeMap.get('path').match(regex.attributeKey)[1] : undefined
    const attributeName = db.getIn([modelKey, 'attributes', attributeKey, 'name'])
    const migrationAction = getMigrationAction(op, changePath)

    let newName
    let value
    if (migrationAction === 'renameColumn') {
      newName = changeMap.get('value')
      value = fromJS({attributeName, newName})
    }

    return changeMap
      .set('model', modelName)
      .set('action', migrationAction)
      .set('value', value || changeMap.get('value') || fromJS({ name: attributeName || modelName }))
  })
}

const getDownAction = (upAction) => {
  switch (upAction) {
    case 'addColumn':
      return 'removeColumn'
    case 'removeColumn':
      return 'addColumn'
    case 'renameColumn':
      return 'renameColumn'
    case 'changeColumn':
      return 'changeColumn'
    case 'createTable':
      return 'dropTable'
    case 'dropTable':
      return 'createTable'
    case 'renameTable':
      return 'renameTable'
    default:
      throw new Error('Could not generate down Action: Up action was not recognized: ' + upAction)
  }
}

const generateMigrationContent = listOfChanges => {
  let upMigration = `{
  up: (queryInterface, Sequelize) => {
    return `
  let downMigration = `\n  },
  down: (queryInterface, Sequelize) => {
    return `
  let migrationEnding = `\n  }
}`

  listOfChanges.forEach((change, idx) => {
    const model = change.get('model')
    const action = change.get('action')
    const downAction = getDownAction(action)
    if (action !== 'renameColumn') {
      const type = change.get('value').get('type')
      const name = change.get('value').get('name')
    }
    let upQuery
    let downQuery
    if (action === 'createTable' || action === 'dropTable') {
      // adding or dropping tables
      let modelObject = `{
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE,
          notType: 'color'
        },
        updatedAt: {
          type: Sequelize.DATE
        },\n`
      // add new attributes (columns) to the model (table)
      const attributes = change.getIn(['value', 'attributes'])
      attributes && attributes.forEach(value => modelObject += `${value.get('name')}: {\n  type: Sequelize.${value.get('type')}\n},`)
      modelObject += `\n}`

      upQuery = `queryInterface["${action}"]("${name}", ${modelObject})`
      downQuery = `queryInterface["${downAction}"]("${name}")`
    } else {
      // working on columns
      if (action === 'renameColumn') {
        upQuery = `queryInterface["${action}"]("${model}","${change.get('value').get('attributeName')}", "${change.get('value').get('newName')}")`
        downQuery = `queryInterface["${downAction}"]("${model}", "${change.get('value').get('newName')}", "${change.get('value').get('attributeName')}")`
      } else {
        upQuery = `queryInterface["${action}"]("${model}", "${name}", Sequelize.${type})`
        downQuery = `queryInterface["${downAction}"]("${model}", "${name}", Sequelize.${type})`
      }
    }

    const upQueryWrapper = idx === 0 ? `${upQuery}` : `\n      .then(() => ${upQuery})`
    const downQueryWrapper = idx === 0 ? `${downQuery}` : `\n      .then(() => ${downQuery})`

    // This adds a query to the up migration chain
    upMigration += upQueryWrapper
    // Add down migration query to the down migration chain
    downMigration += downQueryWrapper
 })

  return upMigration + downMigration + migrationEnding
}


/******************************************/

/****************MAIN FUNCTION *************/
const runMigration = (shouldGenerateModels, directory) => {

  // get db from store
  const state = store.default.getState()
  const db = state.get('db')
  const targetDb = state.get('targetDb')
  const dbName = state.get('dbUrl').replace('postgres://localhost:5432/', '')
  shell.echo('starting migration')

  //********** setup *********//
  const now = Date.now()

  // create config files and migration folders if they don't exist
  const migrationFolderPath = `${directory}/migrations_${dbName}`
  shell.mkdir(migrationFolderPath)
  createConfigFiles(directory, dbName, migrationFolderPath)


  // ******* Find differences to migrate ***********//


  // get the diff between the two objects and
  // add model name and action to diff
  const listOfChanges = getListOfChanges(db, targetDb)
    // --> List of changes now has maps (objects) that have model, action, and value


  // create migrations file content by looping through List of changes and creating
  // functions for each. This just gets the first one.
  const migration = generateMigrationContent(listOfChanges)

  // write migration file
  shell.echo(`"use strict"\nmodule.exports = ${migration}`).to(`${migrationFolderPath}/${now}.js`)

  // Run migration
  shell.exec(`node_modules/.bin/sequelize db:migrate`)
  // copy model files to user chosen directory
  shouldGenerateModels && shell.exec(`node_modules/.bin/sequelize-auto -o "${directory}/models" -d ${dbName} -h localhost -e postgres\n`)

  return 1
}

export default runMigration
