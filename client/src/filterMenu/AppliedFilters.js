import React from 'react'
import PropTypes from 'prop-types'
import Close20 from '@carbon/icons-react/lib/close/20'
import './appliedfilters.scss'

export const AppliedFilters = ({ states, categories, remove }) => {
  return (
    <div className='applied-filters' data-testid='applied-filters'>
      {states.map((state, index) => (
        <div className='applied-filter-state' key={`state-filter-${index}`}>
          <p>{state}</p>
          <Close20
            onClick={() => remove('states', index)}
            className='close20'
          />
        </div>
      ))}
      {categories.map((cat, index) => (
        <div
          className='applied-filter-category'
          key={`category-filter-${index}`}
        >
          <p>{cat}</p>
          <Close20
            onClick={() => remove('category', index)}
            className='close20'
          />
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
