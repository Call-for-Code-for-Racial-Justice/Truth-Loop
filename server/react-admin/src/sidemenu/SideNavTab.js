import React from 'react'
import PropTypes from 'prop-types'
import './sidenav.scss'

const SideNavTab=({label, link})=>{
	const [open, setOpen] = React.useState(false)
	if(label=="API Docs"){
		return(
			<div className="menu-item">
			<button type="button" className="menu-button" onClick={()=>setOpen(!open)}>{label}</button>
			<div className={open?"links":"display-none"}>
				<a className="side-nav-link" href={`/${link}`}> REST {label} </a>
			</div>
			</div>
		)
	}else{
		return(
			<div className="menu-item">
				<button type="button" className="menu-button" onClick={()=>setOpen(!open)}>{label}</button>
				<div className={open?"links":"display-none"}>
					<a className="side-nav-link" href={`/${link}/add`}> Add {label} </a>
					<a className="side-nav-link" href={`/${link}`}> List/Edit/Delete {label} </a>
				</div>
			</div>
		)
	}
}

SideNavTab.propTypes={
	label:PropTypes.string.isRequired,
	link:PropTypes.string.isRequired
}

export default SideNavTab