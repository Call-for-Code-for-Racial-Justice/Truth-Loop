import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import AdminTable from '../AdminTable'
import Paper from '@mui/material/Paper'
import formatDate from '../formatDate'
import AdminTableToolbar from '../AdminTableToolbar'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteItemDialog from '../form/DeleteItemDialog'
import Snackbar from '@mui/material/Snackbar'

AdvocacyGroupsTable.propTypes = {
  advocacyGroups: PropTypes.array,
}

const emptyTableCaption = 'No advocacy groups available'
const caption = 'The advocacy groups table shows a paginated list of all advocacy groups currently available'
const headCells = [
  {id: 'id', label: 'ID'},
  {id: 'name', label: 'Name'},
  {id: 'description', label: 'Description'},
  {id: 'email', label: 'Email Address'},
  {id: 'phone', label: 'Phone Number'},
  {id: 'url', label: 'Website URL'},
  {id: 'created', label: 'Date Created'},
  {id: 'updated', label: 'Last updated'},
]

function AdvocacyGroupsTable(props) {

  const history = useHistory()
  const [advocacyGroups, setAdvocacyGroups] = useState([])
  const [deleteError, setDeleteError] = useState('')
  const [itemToDelete, setItemToDelete] = useState(null)

  const handleCancelDelete = () => {
    setItemToDelete(null)
  }

  const handleCloseDeleteError = function () {
    setDeleteError('')
  }

  const handleDelete = async () => {
    const deleteAdvocacyGroupsResponse = await fetch(`/api/v1/advocacyGroups/${itemToDelete.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    if (deleteAdvocacyGroupsResponse.ok) {
      setItemToDelete(null)
      history.go(0)
    } else {
      setItemToDelete(null)
      const errorText = await deleteAdvocacyGroupsResponse.text()
      setDeleteError(errorText)
    }
  }

  const handleSearchRequest = function (searchText) {
    const filteredRows = props.advocacyGroups.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchText.test(row[field].toString())
      })
    })
    setAdvocacyGroups(filteredRows)
  }

  useEffect(() => {
    if (props.advocacyGroups && props.advocacyGroups.length) {
      setAdvocacyGroups(props.advocacyGroups)
    }
  }, [props.advocacyGroups])

  return (
    <Paper data-testid={'AdvocacyGroupsTable'} elevation={12}>
      <AdminTableToolbar handleSearchRequest={handleSearchRequest} toolbarTitle={'All Advocacy Groups'}
                         showAdd={true} addFormPath={'/advocacyGroups/add'}
                         disabled={!(props.advocacyGroups && props.advocacyGroups.length)}/>
      <AdminTable headCells={headCells}
                  rows={advocacyGroups.map(group => ({
                      ...group,
                      created: formatDate(group.created),
                      updated: formatDate(group.updated),
                    }
                  ))}
                  caption={props.advocacyGroups && props.advocacyGroups.length ? caption : emptyTableCaption}
                  tableLabel={'Advocacy-Groups'}
                  onEditItem={item => {
                    history.push(`/advocacyGroups/edit/${item.id}`, {group: item})
                  }}
                  onDeleteItem={item => {
                    setItemToDelete(item)
                  }}/>
      <Button sx={{m: 2}} variant={'text'} href={'/advocacyGroups/add'} startIcon={<AddIcon/>}>
        Add Advocacy Group
      </Button>
      <DeleteItemDialog title={'Delete Advocacy Group?'} description={''} open={!!itemToDelete}
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

export default AdvocacyGroupsTable
