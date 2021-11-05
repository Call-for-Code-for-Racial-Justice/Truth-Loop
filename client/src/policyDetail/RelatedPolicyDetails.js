import React from 'react'
import PropTypes from 'prop-types'

const RelatedPolicyDetails = ({ policy, id }) => {
  return (
    <p data-testid={'relatedPolicy'}>
      <a href={`./${id}`}>{policy}</a>
    </p>
  )
}
RelatedPolicyDetails.propTypes = {
  policy: PropTypes.string,
  id: PropTypes.string,
}
export default RelatedPolicyDetails
