import React from 'react'
import './Sentiment.scss'
import Watson16 from '@carbon/icons-react/lib/watson/16'
import Progress from './Progress'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { messages } from '../nls/nlsUtility'

const Sentiment = ({ intl }) => {
  return (
    <div className="sentiment">
      <div className="bx--row">
        <div className="bx--col-10 title">
          {intl.formatMessage(messages.communitySentiment)}
        </div>
        <div className="bx--col text-right">
          <Watson16 className="white-icon" />
        </div>
      </div>
      <Progress color="red" title="Negative" percent="15%" />
      <Progress color="blue" title="Neutral" percent="65%" />
      <Progress color="yellow" title="Positive" percent="20%" />
    </div>
  )
}

Sentiment.propTypes = {
  intl: PropTypes.any.isRequired,
}

export default injectIntl(Sentiment)
