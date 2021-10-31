import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import AdminTable from '../AdminTable'
import Paper from '@mui/material/Paper'
import formatDate from '../formatDate'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteItemDialog from '../form/DeleteItemDialog'
import Snackbar from '@mui/material/Snackbar'

PublicationTable.propTypes = {
  publications: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

const emptyTableCaption = 'No publications available'
const caption =
  'The Publications table shows a paginated list of all publications currently available'
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'created', label: 'Date Created' },
  { id: 'updated', label: 'Last updated' },
]

function PublicationTable(props) {
  const history = useHistory()
  const [deleteError, setDeleteError] = useState('')
  const [itemToDelete, setItemToDelete] = useState(null)

  const handleCancelDelete = () => {
    setItemToDelete(null)
  }

  const handleCloseDeleteError = function () {
    setDeleteError('')
  }

  const handleDelete = async () => {
    // TODO https://github.com/Call-for-Code-for-Racial-Justice/Truth-Loop/issues/226
    const deletePublicationsResponse = await fetch(`/api/v1/publications/${itemToDelete.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (deletePublicationsResponse.ok) {
      setItemToDelete(null)
      history.go(0)
    } else {
      setItemToDelete(null)
      const errorText = await deletePublicationsResponse.text()
      setDeleteError(errorText)
    }
  }

  return (
    <Paper data-testid={'publicationTable'} elevation={12}>
      <AdminTable
        headCells={headCells}
        isLoading={props.isLoading}
        rows={props.publications.map((publication) => ({
          ...publication,
          created: formatDate(publication.created),
          updated: formatDate(publication.updated),
        }))}
        caption={props.publications && props.publications.length ? caption : emptyTableCaption}
        tableLabel={'Publications'}
        onEditItem={(item) => {
          history.push(`/publications/edit/${item.id}`, { publication: item })
        }}
        onDeleteItem={(item) => {
          setItemToDelete(item)
        }}
        disableSearch={!(props.publications && props.publications.length)}
      />
      <Button
        sx={{ m: 2 }}
        variant={'text'}
        href={'/publications/add'}
        startIcon={<AddIcon />}
        disabled={props.isLoading}
      >
        Add Publication
      </Button>
      <DeleteItemDialog
        title={'Delete Publication?'}
        description={''}
        open={!!itemToDelete}
        handleCancel={handleCancelDelete}
        handleClose={handleCancelDelete}
        handleDelete={handleDelete}
      />
      <Snackbar
        open={!!deleteError}
        autoHideDuration={6000}
        onClose={handleCloseDeleteError}
        message={deleteError}
      />
    </Paper>
  )
}

export default PublicationTable
