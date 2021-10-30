import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

DeleteItemDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

function DeleteItemDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="delete-item-dialog-title"
      aria-describedby="delete-item-dialog-description"
    >
      <DialogTitle id="delete-item-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-item-dialog-description">
          {props.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCancel}>Cancel</Button>
        <Button onClick={props.handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteItemDialog
