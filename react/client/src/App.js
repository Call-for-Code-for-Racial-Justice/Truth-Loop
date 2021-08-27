import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.scss'
import Home from './Home'
import Policy from './Policy'
import Record from './Record'

function App() {
  return (
    <BrowserRouter>
      <div id={'app'}>
        <div id={'main-content'}>
          <Switch>
            <Route name="home-route" exact path={'/'} component={Home} />
            <Route name="policy-route" exact path={'/policy/:policyId'} component={Policy} />
            <Route name="record-route" exact path={'/policy/:policyId/record'} component={Record} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
