import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import Toolbar from '@mui/material/Toolbar'

AdminTableToolbar.propTypes = {
  toolbarTitle: PropTypes.string.isRequired,
  handleSearchRequest: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

function AdminTableToolbar({toolbarTitle, handleSearchRequest, disabled}) {
  const [searchText, setSearchText] = React.useState('')
  const requestSearch = (searchValue) => {
    setSearchText(searchValue)
    handleSearchRequest(searchValue)
  }
  return (
    <Toolbar sx={{pl: {sm: 2}, pr: {xs: 1, sm: 1}}}>
      <Typography
        sx={{flex: '1 1 100%'}}
        variant="h6"
        id="tableTitle"
        component="h2"
      >
        {toolbarTitle}
      </Typography>

      <Tooltip title="Search list">
        <TextField fullWidth
                   disabled={disabled}
                   variant="standard"
                   value={searchText}
                   onChange={(event) => requestSearch(event.target.value)}
                   placeholder="Search..."
                   InputProps={{
                     startAdornment: <SearchIcon fontSize="small"/>,
                     endAdornment: (
                       <IconButton
                         title="Clear"
                         aria-label="Clear"
                         style={{visibility: searchText ? 'visible' : 'hidden'}}
                         onClick={() => requestSearch('')}
                       >
                         <ClearIcon fontSize="small"/>
                       </IconButton>
                     ),
                   }}
        />
      </Tooltip>
    </Toolbar>
  )
}

export default AdminTableToolbar
