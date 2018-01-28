import {List} from 'immutable'

const initialDbList = List(['bananas'])

// action

const POPULATE_DB_LIST = 'POPULATE_DB_LIST'

const populateDbList = (dbList) => ({type: POPULATE_DB_LIST, dbList})

// thunk

export const fetchDbNames = () => dispatch => {
  // TODO: fetch list of db names and replace hard coding
  const dbNames = ['users', 'bananas', 'girlfriends', 'boyfriends']
  const dbList = List(dbNames)
  return dispatch(populateDbList(dbList))
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
