async function getDatabases() {
  const { Client } = require('pg')

  const client = new Client()
  await client.connect()

  const res = await client.query('SELECT datname FROM pg_database WHERE datistemplate = false;');

  let databases = res.rows.map(anon => {
    return anon.datname
  })

  return databases
}

getDatabases();

