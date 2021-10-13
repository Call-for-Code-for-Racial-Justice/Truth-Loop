import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import AdminTable from '../AdminTable'
import Paper from '@mui/material/Paper'
import formatDate from '../formatDate'
import AdminTableToolbar from '../AdminTableToolbar'

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
function PublicationTable(props) {

  const [publications, setPublications] = React.useState([])

  const handleSearchRequest = function(searchText) {
    const filteredRows = props.publications.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchText.test(row[field].toString())
      })
    })
    setPublications(filteredRows)
  }

  useEffect(() => {
    if (props.publications && props.publications.length) {
      setPublications(props.publications)
    }
  }, [props.publications])

  return (
      props.publications && props.publications.length ? (
        <Paper data-testid={'publicationTable'}>
          <AdminTableToolbar handleSearchRequest={handleSearchRequest} toolbarTitle={'All Publications'}/>
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
