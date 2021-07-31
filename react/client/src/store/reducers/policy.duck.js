export const POLICY_UPDATE_CURRENT_POLICY = 'truth-loop/policy/updateCurrentPolicy'

export const DEFAULT_STATE = {
  currentPolicy: null,
}

export default function reducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case POLICY_UPDATE_CURRENT_POLICY: {
      if (action.payload != null && typeof action.payload !== 'undefined') {
        return {...state, currentPolicy: action.payload}
      }
      return state
    }
    default:
      return state
  }
}

export function updateCurrentPolicy(currentPolicy) {
  return dispatch => {
    return dispatch({type: POLICY_UPDATE_CURRENT_POLICY, payload: currentPolicy})
  }
}
