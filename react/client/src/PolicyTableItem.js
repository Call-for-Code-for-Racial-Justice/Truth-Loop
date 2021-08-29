import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import transformDate from './transformDate'
import {useHistory} from 'react-router-dom'

const PolicyTableItem = ({ id, title, summary, dateIntroduced}) => {
  const history = useHistory()
  const handlePolicyItemClicked = useCallback(() => {
    return history.push(`/policy/${id}`)
  }, [id, history])

  return <div role={'button'} data-testid={`policyTableItem${id}`} onClick={handlePolicyItemClicked}>
    <h2 data-testid={'title'}>{title}</h2>
    <div>
      <h3 data-testid={'summary'}>{summary}</h3>
      <h3 data-testid={'date-introduced'}>{`Introduced: ${transformDate(dateIntroduced)}`}</h3>
    </div>
  </div>
}

PolicyTableItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  dateIntroduced: PropTypes.string.isRequired,
}

export default PolicyTableItem