import fetchPolicy from '../fetchPolicy'

export const FETCH_CURRENT_POLICY_PENDING =
  'truth-loop/policy/fetchCurrentPolicy/pending'
export const FETCH_CURRENT_POLICY_FULFILLED =
  'truth-loop/policy/fetchCurrentPolicy/fulfilled'
export const FETCH_CURRENT_POLICY_REJECTED =
  'truth-loop/policy/fetchCurrentPolicy/rejected'

export const DEFAULT_STATE = {
  currentPolicy: null,
  status: 'idle',
}

export default function reducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case FETCH_CURRENT_POLICY_FULFILLED: {
      if (action.payload != null && typeof action.payload !== 'undefined') {
        return { ...state, currentPolicy: action.payload, status: 'idle' }
      }
      return state
    }
    case FETCH_CURRENT_POLICY_PENDING: {
      return { ...state, status: 'pending' }
    }
    case FETCH_CURRENT_POLICY_REJECTED: {
      return { ...state, status: 'error' }
    }
    default:
      return state
  }
}

export function fetchCurrentPolicy(policyId) {
  return async (dispatch) => {
    dispatch({ type: FETCH_CURRENT_POLICY_PENDING, payload: policyId })
    try {
      const newCurrentPolicy = await fetchPolicy(policyId)
      return dispatch({
        type: FETCH_CURRENT_POLICY_FULFILLED,
        payload: newCurrentPolicy,
      })
    } catch (error) {
      return dispatch({ type: FETCH_CURRENT_POLICY_REJECTED, payload: error })
    }
  }
}
