import React from 'react'
import { useParams } from 'react-router-dom'

const Record = () => {
  const { policyId } = useParams()

  if (policyId) {
    return <h1>Record for Policy {policyId}</h1>
  }
  return <h1>No policy found</h1>
}

export default Record