import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdminHomeRoute from './adminHomeRoute/AdminHomeRoute'
import CategoryRoute from './categories/CategoryRoute'
import CategoryForm from './categories/CategoryForm'
import PublicationRoute from './publications/PublicationRoute'
import PublicationForm from './publications/PublicationForm'
import VideoTestimonialRoute from './videoTestimonials/VideoTestimonialRoute'
import VideoTestimonialForm from './videoTestimonials/VideoTestimonialForm'
import AdvocacyGroupsRoute from './advocacyGroups/AdvocacyGroupsRoute'
import AdvocacyGroupsForm from './advocacyGroups/AdvocacyGroupsForm'
import OfficialsRoute from './officials/OfficialsRoute'
import OfficialsForm from './officials/OfficialsForm'

function AdminApp() {
  return (
    <BrowserRouter>
      <div id={'app'}>
        <div id={'main-content'} data-testid={'mainContent'}>
          <Switch>
            <Route name="admin-home-route" exact path={'/'} component={AdminHomeRoute} />

            <Route name="category-route" exact path={'/categories'} component={CategoryRoute} />
            <Route
              name="add-category-form"
              exact
              path={'/categories/add'}
              component={CategoryForm}
            />
            <Route
              name="edit-category-form"
              path={'/categories/edit/:id'}
              component={CategoryForm}
            />
            <Route
              name="publication-route"
              exact
              path={'/publications'}
              component={PublicationRoute}
            />
            <Route
              name="add-publication-form"
              exact
              path={'/publications/add'}
              component={PublicationForm}
            />
            <Route
              name="edit-publication-form"
              path={'/publications/edit/:id'}
              component={PublicationForm}
            />
                
            <Route
              name="video-testimonial-route"
              exact
              path={'/videoTestimonials'}
              component={VideoTestimonialRoute}
            />
            <Route
              name="add-testimonial-form"
              exact
              path={'/videoTestimonials/add'}
              component={VideoTestimonialForm}
            />
            <Route
              name="edit-testimonial-form"
              path={'/videoTestimonials/edit/:id'}
              component={VideoTestimonialForm}
            />
            <Route
              name="advocacy-group-route"
              exact
              path={'/advocacyGroups'}
              component={AdvocacyGroupsRoute}
            />
            <Route
              name="add-advocacy-group-form"
              exact
              path={'/advocacyGroups/add'}
              component={AdvocacyGroupsForm}
            />
            <Route
              name="edit-advocacy-group-form"
              path={'/advocacyGroups/edit/:id'}
              component={AdvocacyGroupsForm}
            />
                
            <Route
              name="video-testimonial-route"
              exact
              path={'/videoTestimonials'}
              component={VideoTestimonialRoute}
            />
            <Route
              name="add-testimonial-form"
              exact
              path={'/videoTestimonials/add'}
              component={VideoTestimonialForm}
            />
            <Route
              name="edit-testimonial-form"
              path={'/videoTestimonials/edit/:id'}
              component={VideoTestimonialForm}
            />
                
				    <Route name="officials-route" exact path={"/officials"} component={OfficialsRoute} />
				    <Route name="add-officials-form" exact path={'/officials/add'} component={OfficialsForm} />
				    <Route name="edit-officials-form" path={'/officials/edit/:id'} component={OfficialsForm} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default AdminApp
