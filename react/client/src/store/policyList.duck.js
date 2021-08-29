import mockedPolicyDataList from '../mockdata/CURRENT_LIST_RESULT'

export const POLICY_LIST_ITEMS_UPDATE = 'truth-loop/policyList/itemsUpdate'
export const POLICY_LIST_ITEM_DETAILS_UPDATE = 'truth-loop/policyList/itemDetailsUpdate'

// TODO There should probably be a fetchPolicies.js service that attempts to hit the backend service if not running
//  locally and loads the mock data if it is
export const DEFAULT_STATE = {
  items: mockedPolicyDataList || [],
  itemCount: mockedPolicyDataList.length || 0,
  selectedItemDetails: null,
}

export default function reducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case POLICY_LIST_ITEMS_UPDATE: {
      if (action.payload != null && typeof action.payload !== 'undefined') {
        return { ...state, items: action.payload, itemCount: action.payload.length }
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

export function updateItems(items) {
  return dispatch => {
    return dispatch({type: POLICY_LIST_ITEMS_UPDATE, payload: items})
  }
}

export function updateItemDetails(itemDetails) {
  return dispatch => {
    return dispatch({type: POLICY_LIST_ITEM_DETAILS_UPDATE, payload: itemDetails})
  }
}
