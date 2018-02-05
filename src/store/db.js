import {fromJS, Map} from 'immutable'
import getModelInfo from '../../scripts/getModelInfo'
// actions
export const INIT_DB = 'INIT_DB'

const initDB = (db) => ({type: INIT_DB, db: db})

// thunk

export const fetchDb = dbName => dispatch => {
  // JON WILL FIX: FOR NOW HARDCODING NEW STRUCTURE
  // getModelInfo(dbName)
  //   .then(db => dispatch(initDB(db)))
  //   .catch(console.error)

  const exampleDb = fromJS({
    name: 'testDb',
    1: {
      name: 'users',
      attributes: {
        1: {
          name: 'email',
          type: 'STRING'
        },
        2: {
          name: 'firstName',
          type: 'STRING'
        }
      }
    },
    2: {
      name: 'puppies',
      attributes: {
        1: {
          name: 'breed',
          type: 'STRING'
        },
        2: {
          name: 'age',
          type: 'INTEGER'
        }
      }
    }
  })

  return dispatch(initDB(exampleDb))
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
