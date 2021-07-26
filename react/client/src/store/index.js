import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import demoStartReducer from './reducers/demoStart/reducer'
import appSettingsReducer from './reducers/appSettings.duck'
import policyListReducer from './reducers/policyList.duck'

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state))
  } catch (e) {
    console.error(e)
  }
}

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state')
    return stateStr ? JSON.parse(stateStr) : undefined
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const configureStore = () => {

  const reducers = combineReducers({
    demoStart: demoStartReducer,
    appSettings: appSettingsReducer,
    policyList: policyListReducer,
  })

  const middleware = [thunk]

  const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const persistedStore = loadFromLocalStorage()

  const store = createStore(
    reducers,
    persistedStore,
    enhancers(applyMiddleware(...middleware))
  )

  store.subscribe(() => {
    saveToLocalStorage(store.getState())
  })

  return store
}