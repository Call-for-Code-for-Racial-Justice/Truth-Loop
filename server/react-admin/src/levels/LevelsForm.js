import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import TextFieldInput from '../form/TextFieldInput'

const emptyFormValues = {name: '', description: ''}

function LevelsForm() {
  const location = useLocation()
  const existingLevels = location?.state?.level
  const {control, handleSubmit, reset} = useForm({defaultValues: existingLevels ? {...existingLevels} : {...emptyFormValues}})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const history = useHistory()

  const handleCloseFormError = function () {
    setFormError(false)
  }

  const cancel = function () {
    history.push('/levels')
  }

  const onSubmit = async function (values) {
    setSubmitting(true)
    const url = existingLevels ? `/api/v1/levels/${existingLevels.id}` : '/api/v1/levels'
    const levelsResponse = await fetch(url, {
      method: existingLevels ? 'PUT' : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    })
    if (levelsResponse.ok) {
      history.push('/levels')
    } else {
      const errorText = await levelsResponse.text()
      setSubmitting(false)
      setFormError(errorText)
    }
  }

  const resetForm = function () {
    reset()
  }

  return (
    <Paper elevation={12} data-testid={'addLevelForm'} sx={{p: 2}}>
      <Typography component={'h2'} variant={'h6'} mb={2}>Add Level</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
		  <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'name'} control={control} label={'Name'} required/>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'description'} control={control} label={'Description'} required/>
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
                {existingLevels ? 'Update' : 'Add'}
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

export default LevelsForm