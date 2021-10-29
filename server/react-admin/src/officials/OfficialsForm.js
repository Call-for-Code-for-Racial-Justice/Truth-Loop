import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import TextFieldInput from '../form/TextFieldInput'

const emptyFormValues = {name: '', title: '', email_address: '', phone_number: '', website_url: ''}

function OfficialsForm() {
  const location = useLocation()
  const existingOfficial = location?.state?.official
  const {control, handleSubmit, reset} = useForm({defaultValues: existingOfficial ? {...existingOfficial} : {...emptyFormValues}})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const history = useHistory()

  const handleCloseFormError = function () {
    setFormError(false)
  }

  const cancel = function () {
    history.push('/officials')
  }

  const onSubmit = async function (values) {
    setSubmitting(true)
    const url = existingOfficial ? `/api/v1/officials/${existingOfficial.id}` : '/api/v1/officials'
    const officialsResponse = await fetch(url, {
      method: existingOfficial ? 'PUT' : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    })
    if (officialsResponse.ok) {
      history.push('/officials')
    } else {
      const errorText = await officialsResponse.text()
      setSubmitting(false)
      setFormError(errorText)
    }
  }

  const resetForm = function () {
    reset()
  }

  return (
    <Paper elevation={12} data-testid={'addOfficialsForm'} sx={{p: 2}}>
      <Typography component={'h2'} variant={'h6'} mb={2}>Add Official</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
		  <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'name'} control={control} label={'Name'} required/>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'title'} control={control} label={'Title'} required/>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'email_address'} control={control} label={'Email'}
                              required/>
            </Grid>
			<Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'phone_number'} control={control} label={'Phone Number'} required/>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'website_url'} control={control} label={'Website URL'} required/>
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
                {existingOfficial ? 'Update' : 'Add'}
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

export default OfficialsForm
