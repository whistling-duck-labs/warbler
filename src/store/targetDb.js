import {List} from 'immutable'
import {INIT_DB} from './db'

export const UPDATE_DB = 'UPDATE_DB'

const initialState = List([])

export default function (state = initialState, action) {
  switch (action.type) {
    case INIT_DB:
      return action.db
    case UPDATE_DB:
      return action.target_db
    default:
      return state
  }
}
