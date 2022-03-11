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

VideoTestimonialTable.propTypes = {
  testimonials: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

const emptyTableCaption = 'No video testimonials available'
const caption =
  'The testimonials table shows a paginated list of all video testimonials currently available'
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'subject', label: 'Subject' },
  { id: 'comment', label: 'Comment' },
  { id: 'created', label: 'Date Created' },
  { id: 'updated', label: 'Last updated' },
]

function VideoTestimonialTable(props) {
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
    const deleteTestimonialsResponse = await fetch(`/api/v1/videoTestimonials/${itemToDelete.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (deleteTestimonialsResponse.ok) {
      setItemToDelete(null)
      history.go(0)
    } else {
      setItemToDelete(null)
      const errorText = await deleteTestimonialsResponse.text()
      setDeleteError(errorText)
    }
  }

  return (
    <Paper data-testid={'TestimonialTable'} elevation={12}>
      <AdminTable
        headCells={headCells}
        isLoading={props.isLoading}
        rows={props.testimonials.map((testimonial) => ({
          ...testimonial,
          created: formatDate(testimonial.created),
          updated: formatDate(testimonial.updated),
        }))}
        caption={props.testimonials && props.testimonials.length ? caption : emptyTableCaption}
        tableLabel={'Testimonials'}
        onEditItem={(item) => {
          history.push(`/videoTestimonials/edit/${item.id}`, { testimonial: item })
        }}
        onDeleteItem={(item) => {
          setItemToDelete(item)
        }}
        disableSearch={!(props.testimonials && props.testimonials.length)}
      />
      <Button
        sx={{ m: 2 }}
        variant={'text'}
        href={'/videoTestimonials/add'}
        startIcon={<AddIcon />}
        disabled={props.isLoading}
      >
        Add testimonial
      </Button>
      <DeleteItemDialog
        title={'Delete testimonial?'}
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

export default VideoTestimonialTable
