import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AdminHomeRoute from './adminHomeRoute/AdminHomeRoute'
import PublicationRoute from './publications/PublicationRoute'
import PublicationForm from './publications/PublicationForm'
import VideoTestimonialRoute from './videoTestimonials/VideoTestimonialRoute'
import VideoTestimonialForm from './videoTestimonials/VideoTestimonialForm'

function AdminApp() {
  return (
    <BrowserRouter>
      <div id={'app'}>
        <div id={'main-content'} data-testid={'mainContent'}>
          <Switch>
            <Route name="admin-home-route" exact path={'/'} component={AdminHomeRoute} />
            <Route name="publication-route" exact path={'/publications'} component={PublicationRoute} />
			<Route name="video-testimonial-route" exact path={'/videoTestimonials'} component={VideoTestimonialRoute} />
            <Route name="add-publication-form" exact path={'/publications/add'} component={PublicationForm}/>
            <Route name="edit-publication-form" path={'/publications/edit/:id'} component={PublicationForm}/>
			<Route name="add-testimonial-form" exact path={'/videoTestimonials/add'} component={VideoTestimonialForm}/>
			<Route name="edit-testimonial-form" path={'/videoTestimonial/edit/:id'} component={VideoTestimonialForm} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default AdminApp
