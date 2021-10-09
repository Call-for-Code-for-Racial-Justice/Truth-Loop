import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AdminHomeRoute from './adminHomeRoute/AdminHomeRoute'
import PublicationRoute from './publications/PublicationRoute'
import './AdminApp.scss'

function AdminApp() {
  return (
    <BrowserRouter>
      <div id={'app'}>
        <div id={'main-content'} data-testid={'mainContent'}>
          <Switch>
            <Route name="admin-home-route" exact path={'/'} component={AdminHomeRoute} />
            <Route name="publication-route" exact path={'/publications'} component={PublicationRoute} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default AdminApp
