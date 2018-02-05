import {fromJS, List} from 'immutable'
import getModelInfo from '../../scripts/getModelInfo'
// actions
export const INIT_DB = 'INIT_DB'

export const initDB = (db) => ({type: INIT_DB, db: db})

// thunk

export const fetchDb = dbName => dispatch => {
  // fetch all db info
  getModelInfo(dbName)
    .then(db => dispatch(initDB(db)))
    .catch(console.error)
}

// initial state

const initialDB = List([])

// reducer

export default function (state = initialDB, action) {
  switch (action.type) {
    case INIT_DB:
      return action.db
    default:
      return state
  }
}
