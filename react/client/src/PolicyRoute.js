import React from 'react'
import { useParams } from 'react-router-dom'

const PolicyRoute = () => {
  const { policyId } = useParams()

  if (policyId) {
    return <h2>Policy Detail for {policyId}</h2>
  }
  return <h2>No policy found</h2>
}

export default PolicyRoute