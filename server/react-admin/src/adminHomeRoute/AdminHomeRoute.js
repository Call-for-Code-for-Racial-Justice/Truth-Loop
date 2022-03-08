import React from 'react'
import './AdminHomeRoute.scss'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import banner from '../assets/1024px-Black_Lives_Matter_-_Century_City_Protest_-_June_6,_2020_-_49979409667.jpg'

const AdminHomeRoute = () => {
  const theme = useTheme()

  const useStyles = makeStyles(() => ({
    hero: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${banner}')`,
      height: 250,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      color: '#fff',
      fontSize: '4rem',
      [theme.breakpoints.down('sm')]: {
        height: 300,
        fontSize: '3em',
      },
    },
  }))
  const classes = useStyles()
  return (
    <>
      <Box className={classes.hero}>
        <Typography variant="h6" component={'h1'} m={theme.spacing(1)}>
          Administration UI for the Truth Loop database
        </Typography>
      </Box>
      <Box p={2}>
        <Typography component={'h2'} variant={'h6'}>
          Legislative Artifacts
        </Typography>
        <Typography component={'h3'} variant={'body1'}>
          Create artifacts by providing your own summary.
        </Typography>
        <Typography component={'h3'} variant={'body1'}>
          List all the artifacts.
        </Typography>
        <Typography component={'h3'} variant={'body1'}>
          Edit and delete artifacts.
        </Typography>
      </Box>
      <Box p={2}>
        <Typography component={'h2'} variant={'h6'}>
          API Docs
        </Typography>
        <Typography component={'h3'} variant={'body1'}>
          Use the REST API to programmatically CRUD your database entities.
        </Typography>
      </Box>
    </>
  )
}

export default AdminHomeRoute
