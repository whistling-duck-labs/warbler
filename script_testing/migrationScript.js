const shell = require('shelljs')
const path = require('path')
const Sequelize = require('sequelize')

shell.echo("starting migration")

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
const model = 'users'
const modelsPath = path.resolve('server', 'db', 'models')
const configPath = path.resolve('config', 'config.json')
const now = Date.now()


// import migration actions from Redux Store
const migrationActions = [{
  action: 'addColumn',
  name: 'Gender',
  type: 'STRING',
}]

// create config files and migration folders if they don't exist

shell.touch('.sequelizerc')

// setup sequelizerc file
shell.echo(`const path = require('path')\nmodule.exports = {'config': '${configPath}',\n  'models-path': '${modelsPath}'\n}`).to(".sequelizerc")

// setup config file with db credentials
shell.echo(config).to('config/config.json')

// create migrations folder
shell.mkdir("migrations")

// create migrations file by looping through actions array and creating functions for each
const action = migrationActions[0].action
let downAction
if (action === 'addColumn') {
  downAction = 'removeColumn'
}
const type = migrationActions[0].type
const name = migrationActions[0].name
const migration = `{
  up: (queryInterface, Sequelize) => {
    return queryInterface["${action}"]("${model}", "${name}", Sequelize.${type})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface["${downAction}"]("${model}", "${name}", Sequelize.${type})
  }
}`

shell.echo(`"use strict" \nmodule.exports = ${migration}`).to(`migrations/${now}-${model}.js`)

// Run migration

if (shell.exec('node_modules/.bin/sequelize db:migrate').code !== 0) {
  shell.echo('Error: Migration failed');
  shell.exit(1);
}
