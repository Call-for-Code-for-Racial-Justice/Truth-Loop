import React from 'react'
import PropTypes from 'prop-types'
import Close20 from '@carbon/icons-react/lib/close/20'
import './appliedfilters.scss'

export const AppliedFilters = (props) => {
	return (
		<div className="applied-filters" data-testid="applied-filters">
			{props.states.map((state, index) => (
				<div className="applied-filter-state" key={`state-filter-${index}`}>
					<p>{state}</p>
					<Close20 onClick={() => props.delete('states', index)} className="close20" />
				</div>
			))}
			{props.categories.map((cat, index) => (
				<div className="applied-filter-category" key={`category-filter-${index}`}>
					<p>{cat}</p>
					<Close20 onClick={() => props.delete('category', index)} className="close20" />
				</div>
			))}
		</div>
	)
}
AppliedFilters.propTypes = {
	states: PropTypes.array,
	categories: PropTypes.array,
	delete: PropTypes.func,
}