import * as actionTypes from './actionTypes'

const demoStartAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DEMO_START_ACTION,
      data
    })
  }
}

export { demoStartAction }