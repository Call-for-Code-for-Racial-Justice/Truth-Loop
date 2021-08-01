import fetchPolicy from '../../fetchPolicy'

export const POLICY_CURRENT_POLICY_UPDATED = 'truth-loop/policy/currentPolicyUpdated'
export const POLICY_LOADING_NEW_CURRENT_POLICY = 'truth-loop/policy/loadingNewCurrentPolicy'
export const POLICY_CURRENT_POLICY_UPDATE_FAILED = 'truth-loop/policy/policyUpdateFailed'

export const DEFAULT_STATE = {
  currentPolicy: null,
}

export default function reducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case POLICY_CURRENT_POLICY_UPDATED: {
      if (action.payload != null && typeof action.payload !== 'undefined') {
        return {...state, currentPolicy: action.payload}
      }
      return state
    }
    default:
      return state
  }
}

export function updateCurrentPolicy(policyId) {
  return async dispatch => {
    dispatch({type: POLICY_LOADING_NEW_CURRENT_POLICY, payload: policyId})
    try{
      const newCurrentPolicy = await fetchPolicy(policyId)
      return dispatch({type: POLICY_CURRENT_POLICY_UPDATED, payload: newCurrentPolicy})
    } catch(error) {
      return dispatch({type: POLICY_CURRENT_POLICY_UPDATE_FAILED, payload: error})
    }
  }
}
