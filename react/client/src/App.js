import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.scss'
import HomeRoute from './homeRoute/HomeRoute'
import PolicyRoute from './policyRoute/PolicyRoute'
import RecordRoute from './recordRoute/RecordRoute'

function App() {
  return (
    <BrowserRouter>
      <div id={'app'}>
        <div id={'main-content'} data-testid={'mainContent'}>
          <Switch>
            <Route name="home-route" exact path={'/'} component={HomeRoute} />
            <Route name="policy-route" exact path={'/policy/:policyId'} component={PolicyRoute} />
            <Route name="record-route" exact path={'/policy/:policyId/record'} component={RecordRoute} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
