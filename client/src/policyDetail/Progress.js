import React from 'react'
import PropTypes from 'prop-types'
import './Progress.scss'

const Progress = ({ percent, title, color }) => {
  return (
    <div className="progress">
      {percent} {title}
      <div className={`meter ${color}`}>
        <span style={{ width: percent }} />
      </div>
    </div>
  )
}

Progress.propTypes = {
  percent: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Progress
