const shell = require('shelljs')
const path = require('path')
const diff = require('immutablediff')
const {fromJS} = require('immutable')
const store = require('../src/store')
const directoryPath = '/Users/Jon/Documents/fullstack/boilermaker'

// Regexp to get model key inside runmigrations .map
export const regex = {
                modelKey: /\/(\d+)/,
                attributeKey: /attributes\/(\d+)/
              }
// Required because of bug with electron and shelljs
shell.config.execPath = shell.which('node')


/******************HELPER FUNCTIONS *******************/
const createConfigFiles = (modelsPath, configPath, dbName) => {
  //import config data. We don't need username and password as long as password is null
  const config = `{
    "development": {
      "database": "${dbName}",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
  }`
  // setup sequelizerc file
  shell.touch(`.sequelizerc`)
  shell.echo(`const path = require('path')\nmodule.exports = {'config': '${configPath}',\n  'models-path': '${modelsPath}'\n}`).to(`.sequelizerc`)
  // setup config file with db credentials
  shell.echo(config).to(`config/config.json`)
  // create migrations folder
  shell.mkdir(`migrations`)
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
  return diff(db, targetDb).map(changeMap => {

    // add more logic here for different migrations
    // create table
    // drop table
    // rename table
    // rename column
    // change column

    let value //figure out logic for adding value for removeAction
    const op = changeMap.get('op')
    const changePath = changeMap.get('path')
    const modelKey = changeMap.get('path').match(regex.modelKey)[1]
    let modelName
    if (op === 'remove' || op === 'replace') {
      modelName = db.get(modelKey).get('name')
    }
    else {
      modelName = targetDb.get(modelKey).get('name')
    }
    const attributeKey = changeMap.get('path').match(regex.attributeKey) ? changeMap.get('path').match(regex.attributeKey)[1] : undefined
    const attributeName = db.getIn([modelKey, 'attributes', attributeKey, 'name'])
    return changeMap
      .set('model', modelName)
      .set('action', getMigrationAction(op, changePath))
      .set('value', changeMap.get('value') || fromJS({ name: attributeName }))
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
    const type = change.get('value').get('type')
    const name = change.get('value').get('name')
    let upQuery
    let downQuery
    if (action === 'createTable' || action === 'dropTable') {
      // adding or dropping tables
      upQuery = `queryInterface["${action}"]("${name}",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          }
        })`
      downQuery = `queryInterface["${downAction}"]("${name}")`
    } else {
      // working on columns
      upQuery = `queryInterface["${action}"]("${model}", "${name}", Sequelize.${type})`
      downQuery = `queryInterface["${downAction}"]("${model}", "${name}", Sequelize.${type})`
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
const runMigration = async (shouldGenerateModels) => {

  // get db from store
  const state = store.default.getState()
  const db = state.get('db')
  const targetDb = state.get('targetDb')
  const dbUrl = state.get('dbUrl')
  const dbName = dbUrl.replace('postgres://localhost:5432/', '')
  shell.echo('starting migration')

  //********** setup *********//

  const modelsPath = path.resolve('server', 'db', 'models')
  const configPath = path.resolve('config', 'config.json')
  const now = Date.now()

  // create config files and migration folders if they don't exist
  createConfigFiles(modelsPath, configPath, dbName)


  // ******* Find differences to migrate ***********//


  // get the diff between the two objects and
  // add model name and action to diff
  const listOfChanges = getListOfChanges(db, targetDb)
    // --> List of changes now has maps (objects) that have model, action, and value


  // create migrations file content by looping through List of changes and creating
  // functions for each. This just gets the first one.
  const migration = generateMigrationContent(listOfChanges)

  // write migration file
  shell.echo(`"use strict"\nmodule.exports = ${migration}`).to(`migrations/${now}.js`)

  // Run migration
  //if (shell.exec(`node_modules/.bin/sequelize db:migrate`).code !== 0)
  const migrationProcess = await shell.exec(`node_modules/.bin/sequelize db:migrate`, {async: true})
  migrationProcess.stdout.on('data', function(data) {
    console.log('success', data)
    shouldGenerateModels && shell.exec(`node_modules/.bin/sequelize-auto -o "./models" -d ${dbName} -h localhost -e postgres\n`)
  })
}

export default runMigration
