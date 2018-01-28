import {fromJS, List} from 'immutable'

// actions
const INIT_DB = 'INIT_DB'

const initDB = (db) => ({type: INIT_DB, db: db})

// thunk

export const fetchDb = dbName => dispatch => {
  // fetch all db info
  const db = fromJS(
    [ // list of
      { //model objects
        key: 1,
        name: 'users',
        attributes: [ // list of
          { // attribute objects
            key: 1,
            name: 'name',
            type: 'string',
            allowNull: false
          },
          {
            key: 2,
            name: 'email',
            type: 'string',
            allowNull: false
          }
        ]
      }
    ])
  dispatch(initDB(db))
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
