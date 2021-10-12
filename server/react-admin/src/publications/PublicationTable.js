import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import AdminTable from '../AdminTable'
import Paper from '@mui/material/Paper'
import formatDate from '../formatDate'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import TextField from '@mui/material/TextField'


PublicationTable.propTypes = {
  publications: PropTypes.array,
}
const caption = 'The Publications table shows a paginated list of all publications currently available'
const headCells = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'title',
    label: 'Title',
  },
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'created',
    label: 'Date Created',
  },
  {
    id: 'updated',
    label: 'Last updated',
  },
]
const renderEmpty = function() {
  return <div data-testid={'emptyPublications'}>No publications available</div>
}

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
function PublicationTable(props) {

  const [searchText, setSearchText] = React.useState('')
  const [publications, setPublications] = React.useState([])
  useEffect(() => {
    if (props.publications && props.publications.length) {
      setPublications(props.publications)
    }
  }, [props.publications])
  const requestSearch = (searchValue) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = props.publications.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString())
      })
    })
    setPublications(filteredRows)
  }

  return (
      props.publications && props.publications.length ? (
        <Paper data-testid={'publicationTable'}>
          <Toolbar sx={{  pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                All Publications
              </Typography>

              <Tooltip title="Search list">
                <TextField fullWidth
                  variant="standard"
                  value={searchText}
                  onChange={(event) => requestSearch(event.target.value)}
                  placeholder="Search…"
                  InputProps={{
                    startAdornment: <SearchIcon />,
                    endAdornment: (
                      <IconButton
                        title="Clear"
                        aria-label="Clear"
                        style={{ visibility: searchText ? 'visible' : 'hidden' }}
                        onClick={() => requestSearch('')}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Tooltip>
          </Toolbar>
          <AdminTable headCells={headCells}
                      rows={publications.map(publication => ({
                        ...publication,
                        created: formatDate(publication.created),
                        updated: formatDate(publication.updated),
                        }
                      ))}
                      caption={caption}
                      tableLabel={'Publications'}/>
        </Paper>
      ) : renderEmpty()
  )
}

export default PublicationTable
