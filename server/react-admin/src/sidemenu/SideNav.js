import React from 'react'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import SideNavTab from './SideNavTab'
import MuiAppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'

import './sidenav.scss'

const drawerWidth = 280

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))
const SideNav = ({ open, handleClose, handleOpen }) => {
  return (
    <nav>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleOpen()}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Truth Loop Admin UI
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <a href="/" id="home-button">
            <HomeIcon color="primary" />
          </a>
          <IconButton onClick={handleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <SideNavTab label="Legislative Artifacts" link="legislativeArtifacts" />
        <SideNavTab label="Advocacy Groups" link="advocacyGroups" />
        <SideNavTab label="Categories" link="categories" />
        <SideNavTab label="Levels" link="levels" />
        <SideNavTab label="Geographies" link="geospatialDefinitions" />
        <SideNavTab label="Officials" link="officials" />
        <SideNavTab label="Publications" link="publications" />
        <SideNavTab
          label="Video Testimonials"
          link="videoTestimonials"
          component="Video Testimonial"
        />
        <SideNavTab label="Legislative Artifacts" link="legislativeArtifacts" />
        <SideNavTab label="API Docs" link="api-docs" />
      </Drawer>
    </nav>
  )
}

SideNav.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
}

export default SideNav
