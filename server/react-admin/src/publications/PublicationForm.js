import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import TextFieldInput from '../form/TextFieldInput'

const emptyFormValues = { title: '', link: '', description: '' }

function PublicationForm() {
  const location = useLocation()
  const existingPublication = location?.state?.publication
  const { control, handleSubmit, reset } = useForm({
    defaultValues: existingPublication ? { ...existingPublication } : { ...emptyFormValues },
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const history = useHistory()

  const handleCloseFormError = function () {
    setFormError(false)
  }

  const cancel = function () {
    history.push('/publications')
  }

  const onSubmit = async function (values) {
    setSubmitting(true)
    const url = existingPublication
      ? `/api/v1/publications/${existingPublication.id}`
      : '/api/v1/publications'
    const publicationsResponse = await fetch(url, {
      method: existingPublication ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (publicationsResponse.ok) {
      history.push('/publications')
    } else {
      const errorText = await publicationsResponse.text()
      setSubmitting(false)
      setFormError(errorText)
    }
  }

  const resetForm = function () {
    reset()
  }

  return (
    <Paper elevation={12} data-testid={'addPublicationForm'} sx={{ p: 2 }}>
      <Typography component={'h2'} variant={'h6'} mb={2}>
        {existingPublication ? 'Edit' : 'Add'} Publication
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'title'} control={control} label={'Title'} required />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput
                name={'description'}
                control={control}
                label={'Description'}
                required
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'link'} control={control} label={'Link'} required />
            </Grid>
          </Grid>
          <Grid item container justifyContent={'flex-end'} spacing={1}>
            <Grid item>
              <Button variant="outlined" color="primary" disabled={submitting} onClick={cancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" disabled={submitting} onClick={resetForm}>
                Reset
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" disabled={submitting} type={'submit'}>
                {existingPublication ? 'Update' : 'Add'}
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

export default PublicationForm
