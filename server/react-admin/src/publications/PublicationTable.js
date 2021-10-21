import React from 'react'
import PropTypes from 'prop-types'
import AdminTable from '../AdminTable'
import Paper from '@mui/material/Paper'
import formatDate from '../formatDate'

PublicationTable.propTypes = {
  publications: PropTypes.array,
}

const caption = 'The Publications table shows a paginated list of all publications currently available'
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title', },
  { id: 'description', label: 'Description' },
  { id: 'created', label: 'Date Created' },
  { id: 'updated', label: 'Last updated' },
]
const renderEmpty = function() {
  return <div data-testid={'emptyPublications'}>No publications available</div>
}
function PublicationTable(props) {
  return (
      props.publications && props.publications.length ? (
        <Paper data-testid={'publicationTable'}>
          <AdminTable headCells={headCells}
                      rows={props.publications.map(publication => ({
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
