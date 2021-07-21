import React, { useEffect } from 'react'

import * as TL from './styles' // Stands for "Truth Loop"

import { useDemoStartActions } from '../../hooks/demoStart'

const DemoStart = () => {
  const { demoStart } = useDemoStartActions()

  useEffect(() => {
    // Just to don't persist that data on Storage.
    localStorage.clear()
    demoStart('Hello from REDUX')
  }, [])

  return (
    <TL.MainContainer>
      <TL.Title>
        Hey folks, Hello from React!!! 😎
      </TL.Title>
    </TL.MainContainer>
  )
}

export default DemoStart