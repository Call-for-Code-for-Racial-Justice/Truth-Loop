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

CategoryTable.propTypes = {
  categories: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

const emptyTableCaption = 'No categories available'
const caption = 'The Categories table shows a paginated list of all categories currently available'
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'created', label: 'Date Created' },
  { id: 'updated', label: 'Last updated' },
]

function CategoryTable(props) {
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
    const deleteCategoriesResponse = await fetch(`/api/v1/categories/${itemToDelete.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (deleteCategoriesResponse.ok) {
      setItemToDelete(null)
      history.go(0)
    } else {
      setItemToDelete(null)
      const errorText = await deleteCategoriesResponse.text()
      setDeleteError(errorText)
    }
  }

  return (
    <Paper data-testid={'categoryTable'} elevation={12}>
      <AdminTable
        headCells={headCells}
        isLoading={props.isLoading}
        rows={props.categories.map((category) => ({
          ...category,
          created: formatDate(category.created),
          updated: formatDate(category.updated),
        }))}
        caption={props.categories && props.categories.length ? caption : emptyTableCaption}
        tableLabel={'Categories'}
        onEditItem={(item) => {
          history.push(`/categories/edit/${item.id}`, { category: item })
        }}
        onDeleteItem={(item) => {
          setItemToDelete(item)
        }}
        disableSearch={!(props.categories && props.categories.length)}
      />
      <Button
        sx={{ m: 2 }}
        variant={'text'}
        href={'/categories/add'}
        startIcon={<AddIcon />}
        disabled={props.isLoading}
      >
        Add Category
      </Button>
      <DeleteItemDialog
        title={'Delete Category?'}
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

export default CategoryTable
