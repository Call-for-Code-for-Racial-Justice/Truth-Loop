import React from 'react'
import { messages } from '../nls/nlsUtility'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

const PolicyNotice = ({ intl }) => {
  return (
    <div data-testid={'policyNotice'}>
      {intl.formatMessage(messages.policyNotice)}
    </div>
  )
}

PolicyNotice.propTypes = {
  intl: PropTypes.any.isRequired,
}

export default injectIntl(PolicyNotice)
