import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import directories from './modules/directories'
import source from './modules/source'
import target from './modules/target'
import error from './modules/error'

export default combineReducers({
  directories,
  source,
  target,
  error,
  router
})
