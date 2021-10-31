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

LevelsTable.propTypes = {
  levels: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

const emptyTableCaption = 'No levels available'
const caption = 'The level table shows a paginated list of all levels currently available'
const headCells = [
  {id: 'id', label: 'ID'},
  {id: 'name', label: 'Name'},
  {id: 'description', label: 'Description'},
  {id: 'created', label: 'Date Created'},
  {id: 'updated', label: 'Last updated'},
]

function LevelsTable(props) {

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
    const deleteLevelsResponse = await fetch(`/api/v1/levels/${itemToDelete.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    if (deleteLevelsResponse.ok) {
      setItemToDelete(null)
      history.go(0)
    } else {
      setItemToDelete(null)
      const errorText = await deleteLevelsResponse.text()
      setDeleteError(errorText)
    }
  }

  return (
    <Paper data-testid={'LevelsTable'} elevation={12}>
      <AdminTable headCells={headCells}
                  isLoading={props.isLoading}
                  rows={props.levels.map(level => ({
                      ...level,
                      created: formatDate(level.created),
                      updated: formatDate(level.updated),
                    }
                  ))}
                  caption={props.levels && props.levels.length ? caption : emptyTableCaption}
                  tableLabel={'Levels'}
                  onEditItem={item => {
                    history.push(`/levels/edit/${item.id}`, {level: item})
                  }}
                  onDeleteItem={item => {
                    setItemToDelete(item)
                  }}
                  disableSearch={!(props.levels && props.levels.length)}/>
      <Button sx={{m: 2}} variant={'text'} href={'/levels/add'} startIcon={<AddIcon/>} disabled={props.isLoading}>
        Add Level
      </Button>
      <DeleteItemDialog title={'Delete Level?'} description={''} open={!!itemToDelete}
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

export default LevelsTable
