import {createStore, applyMiddleware, compose} from 'redux'
import {combineReducers} from 'redux-immutable'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import db from './db'
import dbList from './dbList'
import targetDb from './targetDb'
import dbUrl from './dbUrl'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({db, dbList, targetDb, dbUrl})
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
)
const store = createStore(reducer, composeEnhancers(middleware))

export default store
