import {fromJS, Map} from 'immutable'
import getModelInfo from '../../scripts/getModelInfo'
import toastr from 'toastr'
// actions
export const INIT_DB = 'INIT_DB'

const initDB = (db) => ({type: INIT_DB, db})

// thunk

export const fetchDb = dbName => dispatch => {
  // fetch all db info
  getModelInfo(dbName)
    .then(db => dispatch(initDB(db)))
    .catch(toastr.error('Error retrieving database information'))
}

// initial state

const initialDB = Map({})

// reducer

export default function (state = initialDB, action) {
  switch (action.type) {
    case INIT_DB:
      return action.db
    default:
      return state
  }
}
