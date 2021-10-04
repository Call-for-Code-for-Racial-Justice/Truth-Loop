export const APP_SETTINGS_UPDATE = 'truth-loop/appSettings/update'

export const DEFAULT_STATE = {
  appTitle: 'Truth Loop',
  topBar: {
    hasBack: false,
    hasSettings: false,
  },
}

export default function reducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case APP_SETTINGS_UPDATE: {
      const newState = {...state}
      if (action.payload.appTitle != null && typeof action.payload.appTitle !== 'undefined') {
        newState.appTitle = action.payload.appTitle
      }
      if (action.payload.topBar) {
        if (action.payload.topBar.hasBack != null && typeof action.payload.topBar.hasBack !== 'undefined') {
          newState.topBar.hasBack = action.payload.topBar.hasBack
        }
        if (action.payload.topBar.hasSettings != null && typeof action.payload.topBar.hasSettings !== 'undefined') {
          newState.topBar.hasSettings = action.payload.topBar.hasSettings
        }
      }
      return newState
    }
    default:
      return state
  }
}

export function updateAppSettings(appSettings) {
  return dispatch => {
    return dispatch({type: APP_SETTINGS_UPDATE, payload: appSettings})
  }
}
