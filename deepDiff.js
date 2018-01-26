const diff = require('deep-diff')

const db = {
  users: {
    type: 'string',
    allowNull: 'false'
  }
}

const changedDb = {
  users: {
    type: 'string',
    allowNull: 'true'
  }
}

const difference = diff(db, changedDb)

console.log(difference[0].kind)
