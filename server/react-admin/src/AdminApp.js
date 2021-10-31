import React from 'react'
import { styled } from '@mui/material/styles'
import { Route, Switch, useLocation } from 'react-router-dom'
import SideNav from './sidemenu/SideNav'
import AdminHomeRoute from './adminHomeRoute/AdminHomeRoute'
import PublicationRoute from './publications/PublicationRoute'
import PublicationForm from './publications/PublicationForm'
import VideoTestimonialRoute from './videoTestimonials/VideoTestimonialRoute'
import VideoTestimonialForm from './videoTestimonials/VideoTestimonialForm'
import AdvocacyGroupsRoute from './advocacyGroups/AdvocacyGroupsRoute'
import AdvocacyGroupsForm from './advocacyGroups/AdvocacyGroupsForm'

import './adminapp.scss'
const drawerWidth = 280

function AdminApp() {
  const location = useLocation()
  const [open, setOpen] = React.useState(true)
  React.useEffect(() => {
    handleDrawerClose()
  }, [location])
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <div id={'app'}>
      <SideNav open={open} handleClose={handleDrawerClose} handleOpen={handleDrawerOpen} />
      <Main open={open} id={'main-content'} data-testid={'mainContent'}>
        <Switch>
          <Route name="admin-home-route" exact path={'/'} component={AdminHomeRoute} />
          <Route
            name="publication-route"
            exact
            path={'/publications'}
            component={PublicationRoute}
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
        </Switch>
      </Main>
    </div>
  )
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  })
)

export default AdminApp
