import {Map} from 'immutable'
import {INIT_DB} from './db'

// actions

export const UPDATE_DB = 'UPDATE_DB'

export const updateDB = (targetDb) => ({type: UPDATE_DB, targetDb})

// reducer

const initialState = Map({})

export default function (state = initialState, action) {
  switch (action.type) {
    case INIT_DB:
      return action.db
    case UPDATE_DB:
      return action.targetDb
    default:
      return state
  }
}
