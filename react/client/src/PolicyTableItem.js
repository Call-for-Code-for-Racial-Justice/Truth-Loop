import React from 'react'

// eslint-disable-next-line react/prop-types
const PolicyTableItem = ({ title, summary, dateIntroduced}) => {
  return <div>
    <h2>{title}</h2>
    <div>
      <h3>{summary}</h3>
      <h3>{dateIntroduced}</h3>
    </div>
  </div>
}

export default PolicyTableItem