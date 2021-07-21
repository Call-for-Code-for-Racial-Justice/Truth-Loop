import { useMemo, useCallback } from 'react'
import { actions as demoStartActions } from '../store/reducers/demoStart/index'

import { useDispatch } from 'react-redux' 
import { bindActionCreators } from 'redux'

export const useDemoStartActions = () => {
  const dispatch = useDispatch()

  const actions = useMemo(
    () => bindActionCreators(
      {
        demoStart: demoStartActions.demoStartAction,
      },
      dispatch
    ), [dispatch]
  )

  const demoStart = useCallback((data) => {
    actions.demoStart(data)
  }, [actions])

  return {
    demoStart
  }
}