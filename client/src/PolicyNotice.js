import React from 'react'
import { messages } from '../nls/nlsUtility'

const PolicyNotice = () => {
  return (
    <div data-testid={'policyNotice'}>
      {intl.formatMessage(messages.policyNotice)}
    </div>
  )
}

export default PolicyNotice
