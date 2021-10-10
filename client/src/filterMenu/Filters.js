import React, {useState, useEffect, useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {AppliedFilters} from './AppliedFilters'
import {States, Categories} from './selections'
import { updateAppSettings } from '../store/appSettings.duck'

export const Filters=(props)=>{
	const dispatch = useDispatch()
	const filterRef = useRef()
	const [locations, setLocations] = useState([])
	const [categories, setCategories] = useState([])
	const { filters } = useSelector(({appSettings})=> appSettings)
	useEffect(()=>{
		setLocations(filters.location)
		setCategories(filters.category)
	},[filters.location,filters.category])
	useEffect(()=>{
		const checkClickOutside=(e)=>{
			if (filterRef.current && !filterRef.current.contains(e.target)) {
				applyFilters(locations,categories)
			}
		}
		document.addEventListener('mousedown', checkClickOutside)
		return ()=>{
			document.removeEventListener('mousedown', checkClickOutside)
		}
	})
	const handleFilters = (e) => {
		if(e.target.name === 'states'){
			setLocations([...locations, e.target.value])
		}else{
			setCategories([...categories, e.target.value])
		}
	}
	const applyFilters=(locations, categories)=>{

		let payload = {
			filters:{
				location:locations,
				category:categories
			}
		}
		dispatch(updateAppSettings(payload))
	}
	const deleteFilter=(name,index)=>{
		if(name == 'states'){
			locations.splice(index,1)
			setLocations([...locations])
		}
		else{
			categories.splice(index,1)
			setCategories([...categories])
		}
	}
	const clearFilters = () => {

		let payload={
			filters:{
				location:[],
				category:[]
			}
		}
		dispatch(updateAppSettings(payload))
	}
	
	return(
		<div ref={filterRef}>
			<AppliedFilters states={locations} categories={categories} delete={deleteFilter} />
			<label>State: </label>
			<select
			className="select"
			name='states'
			onChange={(e)=>{handleFilters(e)}}
			>
			<option value=''>---Please Select One---</option>
			{
				States.map((state,index)=>(
					<option key={`state-option-${index}`} value={state}>{state}</option>
				))
			}
			</select>
			<select
			className="select"
			name='categories'
			onChange={(e)=>{handleFilters(e)}}
			>
			<option value=''>---Please Select One---</option>
			{
				Categories.map((category,index)=>(
					<option key={`category-option-${index}`} value={category}> {category} </option>
				))
			}
			</select>
			<button type='button' onClick={()=>applyFilters(locations,categories)}>apply</button>
			<button type='button' onClick={()=>clearFilters()}>Clear</button>
		</div>
	)
}

Filters.propTypes = {
	show:PropTypes.bool
}