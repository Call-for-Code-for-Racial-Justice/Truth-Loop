import fetchPolicies from '../fetchPolicies'

export const FETCH_POLICIES_PENDING = 'truth-loop/policy/fetchPolicies/pending'
export const FETCH_POLICIES_FULFILLED = 'truth-loop/policy/fetchPolicies/fulfilled'
export const FETCH_POLICIES_REJECTED = 'truth-loop/policy/fetchPolicies/rejected'

export const POLICY_LIST_ITEM_DETAILS_UPDATE = 'truth-loop/policyList/itemDetailsUpdate'

export const DEFAULT_STATE = {
  items: [],
  selectedItemDetails: null,
}

export default function reducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case FETCH_POLICIES_FULFILLED: {
      if (action.payload != null && typeof action.payload !== 'undefined') {
        return { ...state, items: action.payload }
      }
      return state
    }
    case POLICY_LIST_ITEM_DETAILS_UPDATE: {
      if (action.payload != null && typeof action.payload !== 'undefined') {
        return { ...state, selectedItemDetails: action.payload }
      }
      return state
    }
    default:
      return state
  }
}

export function fetchPoliciesFromServer() {
  return dispatch => {
    dispatch({type: FETCH_POLICIES_PENDING})
      return fetchPolicies().then((policies) => {
        return dispatch({type: FETCH_POLICIES_FULFILLED, payload: policies})
      }, (error) => {
        return dispatch({type: FETCH_POLICIES_REJECTED, payload: error})
      })
  }
}
