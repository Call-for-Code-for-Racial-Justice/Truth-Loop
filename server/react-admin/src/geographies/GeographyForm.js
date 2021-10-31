import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import TextFieldInput from '../form/TextFieldInput'

const emptyFormValues = { name: '', short_name_ui: '', description: '' }

function GeographyForm() {
  const location = useLocation()
  const existingGeography = location?.state?.geography
  const { control, handleSubmit, reset } = useForm({
    defaultValues: existingGeography ? { ...existingGeography } : { ...emptyFormValues },
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const history = useHistory()

  const handleCloseFormError = function () {
    setFormError(false)
  }

  const cancel = function () {
    history.push('/geospatialDefinitions')
  }

  const onSubmit = async function (values) {
    setSubmitting(true)
    const url = existingGeography
      ? `/api/v1/geospatialDefinitions/${existingGeography.id}`
      : '/api/v1/geospatialDefinitions'
    const geographiesResponse = await fetch(url, {
      method: existingGeography ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (geographiesResponse.ok) {
      history.push('/geospatialDefinitions')
    } else {
      const errorText = await geographiesResponse.text()
      setSubmitting(false)
      setFormError(errorText)
    }
  }

  const resetForm = function () {
    reset()
  }

  return (
    <Paper elevation={12} data-testid={'addGeographyForm'} sx={{ p: 2 }}>
      <Typography component={'h2'} variant={'h6'} mb={2}>
        {existingGeography ? 'Edit' : 'Add'} Geography
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'name'} control={control} label={'Name'} required />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput
                name={'short_name_ui'}
                control={control}
                label={'Short Name'}
                required
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput
                name={'description'}
                control={control}
                label={'Description'}
                required
              />
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
                {existingGeography ? 'Update' : 'Add'}
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

export default GeographyForm
