const diff = require('deep-diff')
const { Map, Set, fromJS } = require('immutable')
const idiff = require('immutablediff')

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

const dbMap = fromJS(db)
const changedDbMap = fromJS(changedDb)

const difference = diff(db, changedDb)

const immutableDifference = idiff(dbMap, changedDbMap)

console.log(dbMap)

console.log('regular JS', difference[0].kind)

console.log('immutable', immutableDifference)

const diffMap = immutableDifference.get(0)

console.log(diffMap.getIn('op'))
