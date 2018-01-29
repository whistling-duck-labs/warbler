import {List} from 'immutable'
import {INIT_DB} from './db'

// actions

export const UPDATE_DB = 'UPDATE_DB'

export const updateDB = (targetDb) => ({type: UPDATE_DB, targetDb})

// reducer

const initialState = List([])

export default function (state = initialState, action) {
  switch (action.type) {
    case INIT_DB:
      console.log('hiya ', action.db)
      return action.db
    case UPDATE_DB:
      return action.targetDb
    default:
      return state
  }
}
