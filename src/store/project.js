import {Map} from 'immutable'
import toastr from 'toastr'
// actions
export const ADD_PROJECT_DIR = 'ADD_PROJECT_DIR'

const initProject = (projectDir) => ({type: INIT_DB, projectDir})

// thunk

export const addProjectDir = projectDir => dispatch => {
  // add project dir to store
  getModelInfo(dbName)
    .then(db => dispatch(initDB(db)))
    .catch(() => toastr.error('Error adding project dir'))
}

// initial state

const initialProjectDir = Map({})

// reducer

export default function (state = initialProjectDir, action) {
  switch (action.type) {
    case ADD_PROJECT_DIR:
      return action.projectDir
    default:
      return state
  }
}
