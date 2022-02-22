import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentPolicy } from '../store/policy.duck'
import PolicyDetail from '../policyDetail/PolicyDetail'
import { messages } from '../nls/nlsUtility'

const PolicyRoute = () => {
  const { policyId } = useParams()
  const dispatch = useDispatch()
  const { currentPolicy, status } = useSelector(({ policy }) => policy)

  useEffect(() => {
    if (
      status === 'idle' &&
      (!currentPolicy || `${currentPolicy.id}` !== policyId)
    ) {
      dispatch(fetchCurrentPolicy(policyId))
    }
  }, [dispatch, status, policyId, currentPolicy])

  if (currentPolicy && status === 'idle') {
    return (
      <h2 data-testid={'policyDetail'}>
        <PolicyDetail policy={currentPolicy} />
      </h2>
    )
  } else if (status === 'pending') {
    return (
      <h2 data-testid={'loadingPolicy'}>
        {intl.formatMessage(messages.loading)}
      </h2>
    )
  } else if (status === 'error') {
    return (
      <h2 data-testid={'cannotLoadPolicy'}>
        {intl.formatMessage(messages.cannotLoadPolicy)}
      </h2>
    )
  }
  return (
    <h2 data-testid={'emptyPolicy'}>
      {intl.formatMessage(messages.noPolicyFound)}
    </h2>
  )
}

export default PolicyRoute
