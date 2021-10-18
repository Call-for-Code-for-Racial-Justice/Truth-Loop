import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import TextFieldInput from '../form/TextFieldInput'

function PublicationForm() {
  const {control, handleSubmit, reset} = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const history = useHistory()

  const handleCloseFormError = function() {
    setFormError(false)
  }

  const cancel = function () {
    history.push('/publications')
  }

  const onSubmit = async function(values) {
    setSubmitting(true)
    const publicationsResponse = await fetch('/api/v1/publications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(values)
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
    reset({title: '', link: '', description: ''})
  }

  return (
    <Paper elevation={12} data-testid={'addPublicationForm'}>
      <Grid container spacing={2} p={2}>
        <Grid item>
          <Typography component={'h2'} variant={'h6'}>Add Publication</Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={6} xs={12}>
                <TextFieldInput name={'title'} control={control} label={'Title'} required/>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <TextFieldInput name={'description'} control={control} label={'Description'} required/>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <TextFieldInput name={'link'} control={control} label={'Link'} required/>
              </Grid>
              <Grid item container justifyContent={'flex-end'} spacing={2}><Grid item>
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
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
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
