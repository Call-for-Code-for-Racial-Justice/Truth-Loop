import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import transformDate from '../transformDate'
import {useHistory} from 'react-router-dom'
import './PolicyTableItem.scss'



const PolicyTableItem = ({id, title, summary, dateIntroduced, rowNumber}) => {
  const history = useHistory()

  const handlePolicyItemClicked = useCallback(() => {
    return history.push(`/policy/${id}`)
  }, [id, history])

  const determineRowType = useCallback(() => {
    if (((rowNumber + 1) % 2) === 0) return 'sentiment-bar-1 even'
    return 'sentiment-bar-1 odd'
  }, [rowNumber])

  return (
    <div className="bx--grid bx--grid--default policy-card">
      <div className="bx--row r1">
        <div className="bx--col-lg-12 bx--col-md-12 bx--col-sm-12">
          <div className="sentiment-bar">
            <div className={determineRowType()} data-testid={`sentimentBarRow${rowNumber}`}/>
          </div>
        </div>
      </div>
      <div className="bx--row r2" role={'button'} data-testid={`policyTableItem${id}`}
           onClick={handlePolicyItemClicked}>
        <div className="bx--col-lg-4 bx--col-md-4 bx--col-sm-12 title" data-testid={'title'}>
          {title}
        </div>
        <div className="bx--col-lg-4 bx--col-md-4 bx--col-sm-12 summary" data-testid={'summary'}>
          {summary}
        </div>
        <div className="bx--col-lg-4 bx--col-md-4 bx--col-sm-12 introdate" data-testid={'dateIntroduced'}>
          {`Introduced: ${transformDate(dateIntroduced)}`}
        </div>
      </div>
    </div>
  )
}

PolicyTableItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  dateIntroduced: PropTypes.string.isRequired,
  rowNumber: PropTypes.number,
}


export default PolicyTableItem