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
                            'timestamp with time zone': 'DATE'
                          }

  return attributes.rows.map(attribute => {
    //attribute.datatype = dataTypeMapping[attribute.datatype] || attribute.datatype

    return {
      key: attribute.ordinal_position,
      name: attribute.column_name,
      type: dataTypeMapping[attribute.dataType] || attribute.datatype
    }
  })
}

const dbName = 'warbler_testing'
getModelInfo(dbName).then(res => console.log(res))

//export default getModelinfo
