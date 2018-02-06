// actions
const SET_PROJECT_DIR_PATH = 'SET_PROJECT_DIR_PATH'

// action creator that sets project path
export const setProjectDirPath = projectDirPath => ({type: SET_PROJECT_DIR_PATH, projectDirPath})

// initial state

const initialProjectDirPath = ''

// reducer

export default function (state = initialProjectDirPath, action) {
  switch (action.type) {
    case SET_PROJECT_DIR_PATH:
      return action.projectDirPath
    default:
      return state
  }
}
