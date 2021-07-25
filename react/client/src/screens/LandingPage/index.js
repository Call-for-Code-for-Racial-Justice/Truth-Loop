import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import * as TL from './styles' // Stands for "Truth Loop"

import { useDemoStartActions } from '../../hooks/demoStart'

const DemoStart = () => {
  const { demoStart } = useDemoStartActions()
  const appTitle = useSelector(({ appSettings }) => appSettings.appTitle)

  useEffect(() => {
    // Just to don't persist that data on Storage.
    localStorage.clear()
    demoStart('Hello from REDUX')
  }, [demoStart])

  return (
    <TL.MainContainer>
      <TL.Title>
        Hey folks, Welcome to {appTitle}
      </TL.Title>
    </TL.MainContainer>
  )
}

export default DemoStart