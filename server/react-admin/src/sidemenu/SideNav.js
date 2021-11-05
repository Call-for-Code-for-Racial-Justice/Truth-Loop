import React from 'react'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import MuiAppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import './sidenav.scss'

const drawerWidth = 170
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
  const navItems = [
    { label: 'Legislative Artifacts', link: '/legislativeArtifacts' },
    { label: 'Advocacy Groups', link: '/advocacyGroups' },
    { label: 'Categories', link: '/categories' },
    { label: 'Levels', link: '/levels' },
    { label: 'Geographies', link: '/geospatialDefinitions' },
    { label: 'Officials', link: '/officials' },
    { label: 'Publications', link: '/publications' },
    { label: 'Video Testimonials', link: '/videoTestimonials' },
    { label: 'REST API Docs', link: '/api-docs' },
  ]
  return (
    <nav data-testid="navbar">
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleOpen()}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            data-testid="open-nav"
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
            <HomeIcon color="primary" aria-label="Return-Home" data-testid="home" />
          </a>
          <IconButton onClick={handleClose} data-testid="close-nav">
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          {navItems.map((navItem) => (
            <ListItemButton key={navItem.label} href={navItem.link} component="a">
              <ListItemText primary={navItem.label} />
            </ListItemButton>
          ))}
        </List>
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
