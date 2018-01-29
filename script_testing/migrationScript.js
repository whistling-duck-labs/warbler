const shell = require('shelljs')
const path = require('path')
const {fromJS, toJS} = require('immutable')
const diff = require('immutablediff')
// uncomment when store is fully hooked up
// const {db, targetDb, dbUrl} = require('../store')

shell.echo('starting migration')

//********** setup *********//

//import config data
const config = `{
  "development": {
    "username": "Jon",
    "password": null,
    "database": "migrate",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}`

const modelsPath = path.resolve('server', 'db', 'models')
const configPath = path.resolve('config', 'config.json')
const now = Date.now()

// create config files and migration folders if they don't exist
shell.touch('.sequelizerc')
// setup sequelizerc file
shell.echo(`const path = require('path')\nmodule.exports = {'config': '${configPath}',\n  'models-path': '${modelsPath}'\n}`).to('.sequelizerc')
// setup config file with db credentials
shell.echo(config).to('config/config.json')
// create migrations folder
shell.mkdir('migrations')

// import db and targetDb from store, hardcoded for now
const db = fromJS(
  [ // list of
    { //model objects
      key: 1,
      name: 'users',
      attributes: [ // list of
        { // attribute objects
          key: 1,
          name: 'name',
          type: 'STRING',
          allowNull: false
        },
        {
          key: 2,
          name: 'email',
          type: 'STRING',
          allowNull: false
        }
      ]
    }
  ])

const targetDb = fromJS(
  [ // list of
    { //model objects
      key: 1,
      name: 'users',
      attributes: [ // list of
        { // attribute objects
          key: 1,
          name: 'name',
          type: 'STRING',
          allowNull: false
        },
        {
          key: 2,
          name: 'email',
          type: 'STRING',
          allowNull: false
        },
        {
          key: 3,
          name: 'password',
          type: 'STRING'
        }
      ]
    }
  ])

// ******* Find differences to migrate ***********//

// get the diff between the two objects and
// add model name and action to diff
const listOfChanges = diff(db, targetDb).map(model => {
  let migrationAction
  // add more logic here for different migrations
  if (model.get('op') === 'add') {
    migrationAction = 'addColumn'
  }
  return model
  // only works for 1 model name right now
    .set('model', targetDb.get('0').get('name'))
    .set('action', migrationAction)
})

// --> List of changes now has objects that have model, action, and value


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
if (shell.exec('node_modules/.bin/sequelize db:migrate').code !== 0) {
  shell.echo('Error: Migration failed');
  shell.exit(1);
}
