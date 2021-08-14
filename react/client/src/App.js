import React from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import Home from './Home'
import Policy from './Policy'
import Record from './Record'

function App() {
  return (
    <BrowserRouter>
      <h1>Welcome to TruthLoop!</h1>
      <ul>
        <li>
          <Link name="home-link" to="/">Home</Link>
        </li>
        <li>
          <Link name="policy-link" to="/policy/1234">Policy</Link>
        </li>
        <li>
          <Link name="record-link" to="/policy/1234/record">Record</Link>
        </li>
      </ul>
      <hr />
      <Switch>
          <Route name="home-route" exact path={'/'} component={Home} />
          <Route name="policy-route" exact path={'/policy/:policyId'} component={Policy} />
          <Route name="record-route" exact path={'/policy/:policyId/record'} component={Record} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
