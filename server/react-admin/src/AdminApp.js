import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AdminHomeRoute from './adminHomeRoute/AdminHomeRoute'

function AdminApp() {
  return (
    <BrowserRouter>
      <div id={'app'}>
        <div id={'main-content'} data-testid={'mainContent'}>
          <Switch>
            <Route name="admin-home-route" exact path={'/'} component={AdminHomeRoute} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default AdminApp
