export const PRIVACY_ACCEPTED_UPDATE = 'truth-loop/privacy/privacyAcceptedUpdate'
export const PRIVACY_CANCELLED_UPDATE = 'truth-loop/privacy/privacyCancelledUpdate'

export const DEFAULT_STATE = {
  privacyAccepted: false,
  privacyCancelled: false,
}

export default function reducer(state = DEFAULT_STATE, action = {}) {
  if (action.payload === null || typeof action.payload === 'undefined') {
    return state
  }
  switch (action.type) {
    case PRIVACY_ACCEPTED_UPDATE:
      return { ...state, privacyAccepted: action.payload}
    case PRIVACY_CANCELLED_UPDATE:
      return { ...state, privacyCancelled: action.payload}
    default:
      return state
  }
}

export function updatePrivacyAccepted(accepted) {
  return dispatch => {
    return dispatch({type: PRIVACY_ACCEPTED_UPDATE, payload: accepted})
  }
}

export function updatePrivacyCancelled(cancelled) {
  return dispatch => {
    return dispatch({type: PRIVACY_CANCELLED_UPDATE, payload: cancelled})
  }
}