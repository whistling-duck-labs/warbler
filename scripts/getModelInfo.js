import {fromJS} from 'immutable'

async function getModelInfo(selectedDbName) {
  const { Client } = require('pg')

  // We don't need username and password as long as password is null
  const portSetting = 'postgres://localhost:5432/'
  const postgresUrl = portSetting + selectedDbName
  const client = new Client(postgresUrl)

  await client.connect()

  const res = await client.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public'")


  const tableNames = res.rows.map(row => row.tablename)

  const promisedDB = buildTableObjects(tableNames, client)

  return Promise.all(promisedDB).then(db => fromJS(db))
}

function buildTableObjects(tableNames, client) {
  return tableNames.map(async (table, idx) => {
    const tableObject = {
      key: idx,
      name: table,
      attributes: []
    }

    const attributes = await client.query(`SELECT column_name, ordinal_position, data_type from information_schema.columns WHERE table_name = '${table}'`)


    const tableAttributeList = buildTableAttributeList(attributes)
    tableObject.attributes = tableAttributeList
    return tableObject
  })
}

function buildTableAttributeList(attributes) {
  return attributes.rows.map(attribute => {
    let dataType;
    switch (attribute.data_type) {
      case 'character varying':
        dataType = 'STRING'
        break;
      case 'integer':
        dataType = 'INTEGER'
        break;
      case 'timestamp with time zone':
        dataType = 'DATE'
        break;
      default:
        dataType = attribute.data_type;
    }

    return {
      key: attribute.ordinal_position,
      name: attribute.column_name,
      type: dataType
    }
  })
}

export default getModelinfo
