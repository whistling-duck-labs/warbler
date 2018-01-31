const shell = require('shelljs')
const path = require('path')
const diff = require('immutablediff')
const {fromJS} = require('immutable')
const store = require('../src/store')
const directoryPath = '/Users/Jon/Documents/fullstack/boilermaker'

// Regexp to get model key inside runmigrations .map
const modelKeyRegex = /\/(\d+)\//
// Required because of bug with electron and shelljs
shell.config.execPath = shell.which('node')


/******************HELPER FUNCTIONS *******************/
const createConfigFiles = (modelsPath, configPath, dbUrl) => {
  //import config data. We don't need username and password as long as password is null
  const dbName = dbUrl.replace('postgres://localhost:5432/', '')
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

/******************************************/


/****************MAIN FUNCTION *************/
const runMigration = async () => {

  // get db from store
  const state = store.default.getState()
  const db = state.get('db')
  const dbUrl = state.get('dbUrl')
  shell.echo('starting migration')

  //********** setup *********//

  const modelsPath = path.resolve('server', 'db', 'models')
  const configPath = path.resolve('config', 'config.json')
  const now = Date.now()

  // create config files and migration folders if they don't exist
  createConfigFiles(modelsPath, configPath, dbUrl)


  // ******* Find differences to migrate ***********//

  // //TESTING ONLY - SHOULD IMPORT FROM STORE
  // const attributes = db.getIn(['2', 'attributes'])
  // const targetDb = db.setIn(['2', 'attributes'], attributes.push({
  //   key: 21,
  //   name: 'oregano',
  //   type: 'INTEGER'
  // }))
  // //***************

  // get the diff between the two objects and
  // add model name and action to diff
  const listOfChanges = diff(db, targetDb).map(changeMap => {

    // add more logic here for different migrations
    // create table
    // drop table
    // rename table
    // rename column
    // change column

    let value //figure out logic for adding value for removeAction
    const op = changeMap.get('op')
    const changePath = changeMap.get('path')
    const modelKey = changeMap.get('path').match(modelKeyRegex)[1]
    const modelName = targetDb.get(modelKey).get('name')
    return changeMap
      .set('model', modelName)
      .set('action', getMigrationAction(op, changePath))
      .set('value', value || changeMap.value)
  })
  // --> List of changes now has maps (objects) that have model, action, and value


  // create migrations file by looping through List of changes and creating functions for each. This just gets the first one.
  const model = listOfChanges.get('0').get('model')
  const action = listOfChanges.get('0').get('action')
  let downAction
  // add more logic here for opposite (down) actions
  if (action === 'addColumn') {
    downAction = 'removeColumn'
  }
  const type = listOfChanges.get('0').get('value').get('type')
  const name = listOfChanges.get('0').get('value').get('name')

  const migration = `{
    up: (queryInterface, Sequelize) => {
      return queryInterface["${action}"]("${model}", "${name}", Sequelize.${type})
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface["${downAction}"]("${model}", "${name}", Sequelize.${type})
    }
  }`

  // write migration file
  shell.echo(`"use strict" \nmodule.exports = ${migration}`).to(`migrations/${now}-${model}.js`)

  // Run migration
  //if (shell.exec(`node_modules/.bin/sequelize db:migrate`).code !== 0)
  const migrationProcess = await shell.exec(`node_modules/.bin/sequelize db:migrate`, {async: true})
  migrationProcess.stdout.on('data', function(data) {
    console.log('success', data)
  })
}

export default runMigration
