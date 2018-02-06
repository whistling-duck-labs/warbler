import {Map} from 'immutable'
import toastr from 'toastr'
// actions
export const ADD_PROJECT_DIR_PATH = 'ADD_PROJECT_DIR_PATH'

// action creator that sets project path
const setProjectDirPath = projectDirPath => ({type: INIT_DB, projectDirPath})

// initial state

const initialProjectDirPath = ''

// reducer

export default function (state = initialProjectDirPath, action) {
  switch (action.type) {
    case ADD_PROJECT_DIR_PATH:
      return action.projectDirPath
    default:
      return state
  }
}
