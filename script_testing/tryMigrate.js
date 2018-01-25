const jetpack = require('fs-jetpack')
const shell = require('shelljs');

shell.touch('.sequelizerc')

function writerc (config, modelsPath, seedersPath, migrationsPath) {

  jetpack.write('./sequelizerc',
    `const path = require('path');

    module.exports = {
      'config': path.resolve(${config}),
      'models-path': path.resolve(${modelsPath}),
      'seeders-path': path.resolve(${seedersPath}),
      'migrations-path': path.resolve(${migrationsPath})
    }`
)}

writerc('config/config.json', "server/db/models", "db/seeders", "server/db/migrations")
