import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import AdminTable from '../AdminTable'
import Paper from '@mui/material/Paper'
import formatDate from '../formatDate'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteItemDialog from '../form/DeleteItemDialog'
import Snackbar from '@mui/material/Snackbar'

OfficialsTable.propTypes = {
  officials: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

const emptyTableCaption = 'No officials available'
const caption = 'The officials table shows a paginated list of all officials currently available'
const headCells = [
  {id: 'id', label: 'ID'},
  {id: 'id', label: 'Name'},
  {id: 'title', label: 'Title'},
  {id: 'email_address', label: 'Email Address'},
  {id: 'phone_number', label: 'Phone Number'},
  {id: 'website_url', label: 'Website URL'},
  {id: 'created', label: 'Date Created'},
  {id: 'updated', label: 'Last updated'},
]

function OfficialsTable(props) {

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
    const deleteOfficialsResponse = await fetch(`/api/v1/officials/${itemToDelete.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    if (deleteOfficialsResponse.ok) {
      setItemToDelete(null)
      history.go(0)
    } else {
      setItemToDelete(null)
      const errorText = await deleteOfficialsResponse.text()
      setDeleteError(errorText)
    }
  }

  return (
    <Paper data-testid={'officialsTable'} elevation={12}>
      <AdminTable headCells={headCells}
                  isLoading={props.isLoading}
                  rows={props.officials.map(official => ({
                      ...official,
                      created: formatDate(official.created),
                      updated: formatDate(official.updated),
                    }
                  ))}
                  caption={props.officials && props.officials.length ? caption : emptyTableCaption}
                  tableLabel={'Officials'}
                  onEditItem={item => {
                    history.push(`/officials/edit/${item.id}`, {official: item})
                  }}
                  onDeleteItem={item => {
                    setItemToDelete(item)
                  }}
                  disableSearch={!(props.officials && props.officials.length)}/>
      <Button sx={{m: 2}} variant={'text'} href={'/officials/add'} startIcon={<AddIcon/>} disabled={props.isLoading}>
        Add Officials
      </Button>
      <DeleteItemDialog title={'Delete Official?'} description={''} open={!!itemToDelete}
                        handleCancel={handleCancelDelete} handleClose={handleCancelDelete}
                        handleDelete={handleDelete}/>
      <Snackbar
        open={!!deleteError}
        autoHideDuration={6000}
        onClose={handleCloseDeleteError}
        message={deleteError}
      />
    </Paper>
  )
}

export default OfficialsTable
