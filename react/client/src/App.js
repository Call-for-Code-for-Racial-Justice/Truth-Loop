import React from 'react'

import Router from './router'

import LandingPage from './screens/LandingPage/index'

function App() {
  // Add as many paths as you need.
  const paths = {
    landingPage: '/',
  }
  

  // Add as many routes as you need.
  const routes = [
    { path: paths.landingPage, component: LandingPage },
  ]

  return <Router routes={routes} />
}

export default App
