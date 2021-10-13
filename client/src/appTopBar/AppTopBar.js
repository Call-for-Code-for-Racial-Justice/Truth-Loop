import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import ChevronLeft20 from '@carbon/icons-react/lib/chevron--left/20'
import SettingsAdjust20 from '@carbon/icons-react/lib/settings--adjust/20'
import './apptopbar.scss'
import FilterMenu from '../filterMenu/FilterMenu'

export default function AppTopBar() {
	const location = useLocation()
	const history = useHistory()
	const ref = useRef()
	const [back, setBack] = useState(true)
	const [show, setShow] = useState(false)
	useEffect(() => {
		if (location.pathname === '/') {
			setBack(false)
		} else { setBack(true) }
	}, [location])
	useEffect(() => {
		const checkClickOutside = (e) => {
			if (show && ref.current && !ref.current.contains(e.target)) {
				setShow(false)
			}
		}
		document.addEventListener('mousedown', checkClickOutside)
		return () => {
			document.removeEventListener('mousedown', checkClickOutside)
		}
	}, [show])
	return (
		<div className="app-top-bar">
			<div className="left-panel">
				{back && <ChevronLeft20 className="back" onClick={() => history.goBack()} data-testid={'backButton'} />}
			</div>
			<div className="title">
				<p>Truth-Loop</p>
			</div>
			<div className="right-panel">
				<SettingsAdjust20 className="settings" data-testid='settingsButton' onMouseDown={() => { setShow(!show) }} />
			</div>
			<FilterMenu show={show} ref={ref} />

		</div>
	)
}
