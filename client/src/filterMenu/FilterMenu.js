import React, { forwardRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { AppliedFilters } from './AppliedFilters'
import { States, Categories } from './selections'
import { updateAppSettings } from '../store/appSettings.duck'
import './filtermenu.scss'

const FilterMenu = forwardRef(({ show }, ref) => {
  const dispatch = useDispatch()
  const [locations, setLocations] = useState([])
  const [categories, setCategories] = useState([])
  const { filters } = useSelector(({ appSettings }) => appSettings)
  useEffect(() => {
    setLocations(filters.location ? filters.location : [])
    setCategories(filters.category ? filters.category : [])
  }, [])
  useEffect(() => {
    if (show == false) {
      applyFilters(locations, categories)
    }
  }, [show])
  const handleFilters = (e) => {
    if (e.target.name === 'states') {
      if (!locations.includes(e.target.value)) {
        setLocations([...locations, e.target.value])
      }
    } else {
      if (!categories.includes(e.target.value)) {
        setCategories([...categories, e.target.value])
      }
    }
  }
  const applyFilters = (locations, categories) => {
    let payload = {
      filters: {
        location: locations,
        category: categories,
      },
    }
    dispatch(updateAppSettings(payload))
  }
  const deleteFilter = (name, index) => {
    if (name == 'states') {
      locations.splice(index, 1)
      setLocations([...locations])
    } else {
      categories.splice(index, 1)
      setCategories([...categories])
    }
  }
  const clearFilters = () => {
    let payload = {
      filters: {
        location: [],
        category: [],
      },
    }
    dispatch(updateAppSettings(payload))
  }
  return (
    <div>
      {show && (
        <div className='menu-bg'>
          <div className='menu-main' ref={ref}>
            <p>Filter:</p>
            <div className='filters' data-testid='filterSelection'>
              <div>
                <AppliedFilters
                  states={locations}
                  categories={categories}
                  remove={deleteFilter}
                />
                <div className='inputs'>
                  <label className='label'>State: </label>
                  <select
                    className='select'
                    name='states'
                    onChange={handleFilters}
                    data-testid='state-selection'
                  >
                    <option value=''>---Please Select One---</option>
                    {States.map((state, index) => (
                      <option key={`state-option-${index}`} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <label className='label'>Category: </label>
                  <select
                    className='select'
                    name='categories'
                    onChange={handleFilters}
                    data-testid='category-selection'
                  >
                    <option value=''>---Please Select One---</option>
                    {Categories.map((category, index) => (
                      <option key={`category-option-${index}`} value={category}>
                        {' '}
                        {category}{' '}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type='button'
                  onClick={() => applyFilters(locations, categories)}
                >
                  Apply
                </button>
                <button type='button' onClick={clearFilters}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

FilterMenu.propTypes = {
  show: PropTypes.bool,
}
FilterMenu.displayName = 'FilterMenu'
export default FilterMenu
