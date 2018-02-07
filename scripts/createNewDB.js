const store = require('../src/store')
const { Client } = require('pg')

async function createNewDB(dbName) {
  const client = new Client()
  await client.connect()

  return client.query(`CREATE DATABASE ${dbName};`)
}

export default createNewDB;
