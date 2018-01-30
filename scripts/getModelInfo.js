const {fromJS} = require('immutable')

async function getModelInfo(selectedDbName) {
  const { Client } = require('pg')

  // We don't need username and password as long as password is null
  const portSetting = 'postgres://localhost:5432/'
  const postgresUrl = portSetting + selectedDbName
  const client = new Client(postgresUrl)

  await client.connect()

  // Get all models for the selected database
  const res = await client.query(`SELECT *
                                  FROM pg_catalog.pg_tables
                                  WHERE schemaname = 'public'`)

  const modelNames = res.rows.map(row => row.tablename)

  const promisedDB = buildModelObjects(modelNames, client)

  return Promise.all(promisedDB).then(db => fromJS(db))
}

function buildModelObjects(modelNames, client) {
  return modelNames.map(async (model, idx) => {
    const modelObject = {
      key: idx,
      name: model,
      attributes: []
    }

    // Get each attribute on a model, their index, and data type
    const attributes = await client.query(`SELECT column_name, ordinal_position, data_type
                                           FROM information_schema.columns
                                           WHERE table_name = '${model}'`)

    const modelAttributeList = buildModelAttributeList(attributes)
    modelObject.attributes = modelAttributeList
    return modelObject
  })
}

function buildModelAttributeList(attributes) {
  const dataTypeMapping = { 'character varying': 'STRING',
                            'integer': 'INTEGER',
                            'timestamp with time zone': 'DATE',
                            'boolean': 'BOOLEAN',
                            'text': 'TEXT',
                            'double precision': 'FLOAT'
                          }

  return attributes.rows.map(attribute => {

    return {
      key: attribute.ordinal_position,
      name: attribute.column_name,
      type: dataTypeMapping[attribute.data_type] || attribute.data_type
    }
  })
}

const dbName = 'warbler_testing'
getModelInfo(dbName).then(res => console.log(res))

//export default getModelinfo
