import {List} from 'immutable'
import getDatabases from '../../scripts/getDatabases'

const initialDbList = List(['bananas'])

// action

const POPULATE_DB_LIST = 'POPULATE_DB_LIST'

const populateDbList = (dbList) => ({type: POPULATE_DB_LIST, dbList})

// thunk

export const fetchDbNames = () => dispatch => {
  getDatabases()
    .then(dbs => {
      const dbList = List(dbs)
      return dispatch(populateDbList(dbList))
    })
    .catch(err => console.error(err))
}

// reducer

export default function (state = initialDbList, action) {
  switch (action.type) {
    case POPULATE_DB_LIST:
      return action.dbList
    default:
      return state
  }
}
