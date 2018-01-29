const initialDbUrl = '127.0.0.1:5432/migrate'

// action

const SET_DB_URL = 'SET_DB_URL'

export const setDbUrl = url => ({type: SET_DB_URL, url})

// reducer

export default function (state = initialDbUrl, action) {
  switch (action.type) {
    case SET_DB_URL:
      return action.url
    default:
      return state
  }
}
