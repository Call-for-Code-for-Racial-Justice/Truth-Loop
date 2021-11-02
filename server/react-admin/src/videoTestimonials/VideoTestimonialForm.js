import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import TextFieldInput from '../form/TextFieldInput'
import CheckboxInput from '../form/CheckboxInput'

// eslint-disable-next-line camelcase
const emptyFormValues = { subject: '', comment: '', video_cms_id: '', prvcy_stmt_ack: false }

function VideoTestimonial() {
  const location = useLocation()
  const existingTestimonial = location?.state?.testimonial
  const { control, handleSubmit, reset } = useForm({
    defaultValues: existingTestimonial ? { ...existingTestimonial } : { emptyFormValues },
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const history = useHistory()

  const handleCloseFormError = function () {
    setFormError(false)
  }

  const cancel = function () {
    history.push('/videoTestimonials')
  }

  const onSubmit = async function (values) {
    setSubmitting(true)
    const url = existingTestimonial
      ? `/api/v1/videoTestimonials/${existingTestimonial.id}`
      : '/api/v1/videoTestimonials'
    const testimonialsResponse = await fetch(url, {
      method: existingTestimonial ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      // eslint-disable-next-line camelcase
      body: JSON.stringify({...values}),
    })
    if (testimonialsResponse.ok) {
      history.push('/videoTestimonials')
    } else {
      const errorText = await testimonialsResponse.text()
      setSubmitting(false)
      setFormError(errorText)
    }
  }
  const resetForm = function () {
    reset()
  }
  return (
    <Paper elevation={12} data-testid={'addTestimonialForm'} sx={{ p: 2 }}>
      <Typography component={'h2'} variant={'h6'} mb={2}>
        {existingTestimonial ? 'Edit' : 'Add'} Testimonial
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'subject'} control={control} label={'Subject'} required />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'comment'} control={control} label={'Comment'} required />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'video_cms_id'} control={control} label={'Video CMS ID'} required />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CheckboxInput name='privacy_stmt_ack' control={control} label={'Privacy Statement Acknowledgement'} required />
            </Grid>
          </Grid>
          <Grid item container justifyContent={'flex-end'} spacing={1}>
            <Grid item>
              <Button variant='outlined' color='primary' disabled={submitting} onClick={cancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' color='primary' disabled={submitting} onClick={resetForm}>
                Reset
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained' color='primary' disabled={submitting} type={'submit'}>
                {existingTestimonial ? 'Update' : 'Add'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={!!formError}
        autoHideDuration={6000}
        onClose={handleCloseFormError}
        message={formError}
      />
    </Paper>
  )
}
export default VideoTestimonial
