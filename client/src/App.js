import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss'
import HomeRoute from './homeRoute/HomeRoute'
import PolicyRoute from './policyRoute/PolicyRoute'
import RecordRoute from './recordRoute/RecordRoute'
import AppTopBar from './appTopBar/AppTopBar'
import { getMsgsAndUpdtIntl } from './nls/nlsUtility'

function App() {
  useEffect(() => {
    // on component mount, set locale to use.
    // defects on multiple factors:
    // when we have volunteer translators,
    // what set of locales will we support,
    // do we want a locale dropdown selector,
    // do we want locale to be initialized based on browser locale
    //
    // for now initialize to en only
    // for testing locale change, try setting 'fr' here
    getMsgsAndUpdtIntl('en')
  }, [])
  return (
    <BrowserRouter>
      <div id={'app'}>
        <div id={'main-content'} data-testid={'mainContent'}>
          <AppTopBar />
          <Switch>
            <Route name="home-route" exact path={'/'} component={HomeRoute} />
            <Route
              name="policy-route"
              exact
              path={'/policy/:policyId'}
              component={PolicyRoute}
            />
            <Route
              name="record-route"
              exact
              path={'/policy/:policyId/record'}
              component={RecordRoute}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
