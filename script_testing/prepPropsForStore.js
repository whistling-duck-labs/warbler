const Sequelize = require('sequelize');

module.exports = function convertFile(file, dbPath) {
  const convertThisFile = require('./' + file);
  const db = new Sequelize(dbPath);
  const tableConversion = convertThisFile(db, Sequelize);
  return tableConversion.rawAttributes;
}
