import React from 'react'
import PropTypes from 'prop-types'

const PolicyTableItem = ({ title, summary, dateIntroduced}) => {
  return <div>
    <h2>{title}</h2>
    <div>
      <h3>{summary}</h3>
      <h3>{dateIntroduced}</h3>
    </div>
  </div>
}

PolicyTableItem.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  dateIntroduced: PropTypes.string.isRequired,
}

export default PolicyTableItem