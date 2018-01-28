import {List} from 'immutable'
import diff from 'immutablediff'

// actions
export const INIT_DB = 'INIT_DB'

export const initDB = (db) => ({type: INIT_DB, db: db})

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
