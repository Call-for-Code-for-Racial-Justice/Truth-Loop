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

GeographyTable.propTypes = {
  geographies: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

const emptyTableCaption = 'No geospatial definitions available'
const caption =
  'The Geographies table shows a paginated list of all geospatial definitions currently available'
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'short_name_ui', label: 'Short Name' },
  { id: 'description', label: 'Description' },
  { id: 'created', label: 'Date Created' },
  { id: 'updated', label: 'Last updated' },
]

function GeographyTable(props) {
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
    const deleteGeographiesResponse = await fetch(
      `/api/v1/geospatialDefinitions/${itemToDelete.id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    if (deleteGeographiesResponse.ok) {
      setItemToDelete(null)
      history.go(0)
    } else {
      setItemToDelete(null)
      const errorText = await deleteGeographiesResponse.text()
      setDeleteError(errorText)
    }
  }

  return (
    <Paper data-testid={'geographyTable'} elevation={12}>
      <AdminTable
        headCells={headCells}
        isLoading={props.isLoading}
        rows={props.geographies.map((geography) => ({
          ...geography,
          created: formatDate(geography.created),
          updated: formatDate(geography.updated),
        }))}
        caption={props.geographies && props.geographies.length ? caption : emptyTableCaption}
        tableLabel={'Geographies'}
        onEditItem={(item) => {
          history.push(`/geospatialDefinitions/edit/${item.id}`, { geography: item })
        }}
        onDeleteItem={(item) => {
          setItemToDelete(item)
        }}
        disableSearch={!(props.geographies && props.geographies.length)}
      />
      <Button
        sx={{ m: 2 }}
        variant={'text'}
        href={'/geospatialDefinitions/add'}
        startIcon={<AddIcon />}
        disabled={props.isLoading}
      >
        Add Geography
      </Button>
      <DeleteItemDialog
        title={'Delete Geography?'}
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

export default GeographyTable
