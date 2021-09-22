import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

//Icons 
import ChevronLeft20 from '@carbon/icons-react/lib/chevron--left/20'
import SettingsAdjust20 from '@carbon/icons-react/lib/settings--adjust/20'

import './apptopbar.scss'


export default function AppTopBar() {
    const location = useLocation()
    const history = useHistory()
    const [back, setBack] = useState(true)
    useEffect(() => {
        if (location.pathname === '/') {
            setBack(false)
        } else { setBack(true) }
    }, [location])
    return (
        <div className="app-top-bar">
            <div className="left-panel">
                {back && <ChevronLeft20 className="back" onClick={() => history.goBack()} data-testid={'backButton'}/>}
            </div>
            <div className="title">Truth-Loop</div>
            <div className="right-panel">
                <SettingsAdjust20 className="settings" data-testid='settingsButton'/>
            </div>
        </div>
    )
}