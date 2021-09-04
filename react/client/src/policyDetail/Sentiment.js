import React from 'react'
import './Sentiment.scss'
import Watson16 from '@carbon/icons-react/lib/watson/16'
import Progress from './Progress'

const Sentiment = () => {
  return (
    <div className="sentiment">
      <div className="bx--row">
        <div className="bx--col-10 title">COMMUNITY SENTIMENT</div>
        <div className="bx--col text-right">
          <Watson16 className="white-icon"/>
        </div>
      </div>
      <Progress color="red" title="Negative" percent="15%"/>
      <Progress color="blue" title="Neutral" percent="65%"/>
      <Progress color="yellow" title="Positive" percent="20%"/>
    </div>
  )
}

export default Sentiment