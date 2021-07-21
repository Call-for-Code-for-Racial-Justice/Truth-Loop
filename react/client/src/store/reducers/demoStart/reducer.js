import * as actionTypes from './actionTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {}

const demoStartReducer = createReducer(initialState, {
  [actionTypes.DEMO_START_ACTION]: (state, data) => {

    state.demoStartInfo = data
  },
})

export default function reducer(state = initialState, action={}) {
  return {
    demoStartService: demoStartReducer(state.demoStartService, action),
  }
}