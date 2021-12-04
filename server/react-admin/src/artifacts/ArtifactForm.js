import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import TextFieldInput from '../form/TextFieldInput'
import DateInput from '../form/DateInput'
import SelectInput from '../form/SelectInput'
import ArtifactIntersections from './ArtifactIntersections'

const emptyFormValues = {
  title: '',
  summary: '',
  link_to_full_text: '',
  date_introduced: '',
  status: '',
}

async function fetchFullArtifact(artifactId) {
  const fullArtifactResponse = await fetch(`/api/v1/legislativeArtifacts/fullDetail/${artifactId}`)
  return await fullArtifactResponse.json()
}

function ArtifactForm() {
  const location = useLocation()
  const [existingArtifact, setExistingArtifact] = useState(location?.state?.artifact)
  const { control, handleSubmit, reset } = useForm({
    defaultValues: existingArtifact ? { ...existingArtifact } : { ...emptyFormValues },
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const history = useHistory()

  const reloadArtifact = async () => {
    const fullArtifact = await fetchFullArtifact(existingArtifact.id)
    setExistingArtifact(fullArtifact)
    history.replace({ pathname: location.pathname, state: { artifact: fullArtifact } })
  }

  const handleCloseFormError = function () {
    setFormError('')
  }

  const cancel = function () {
    history.push('/artifacts')
  }

  const onSubmit = async function (values) {
    setSubmitting(true)
    const url = existingArtifact
      ? `/api/v1/legislativeArtifacts/${existingArtifact.id}`
      : '/api/v1/legislativeArtifacts'
    const artifactsResponse = await fetch(url, {
      method: existingArtifact ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (artifactsResponse.ok) {
      history.push('/artifacts')
    } else {
      const errorText = await artifactsResponse.text()
      setSubmitting(false)
      setFormError(errorText)
    }
  }

  const resetForm = function () {
    reset()
  }

  return (
    <>
      <Paper elevation={12} data-testid={'addArtifactsForm'} sx={{ p: 2 }}>
        <Typography component={'h2'} variant={'h6'} mb={2}>
          {existingArtifact ? 'Edit' : 'Add'} Artifact
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item lg={4} md={6} xs={12}>
                <TextFieldInput name={'title'} control={control} label={'Title'} required />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <TextFieldInput name={'summary'} control={control} label={'Summary'} required />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <TextFieldInput
                  name={'link_to_full_text'}
                  control={control}
                  label={'Link to Full Text'}
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <DateInput
                  name={'date_introduced'}
                  control={control}
                  label={'Date Introduced'}
                  maxDate={new Date()}
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <SelectInput
                  name={'status'}
                  control={control}
                  label={'Status'}
                  required
                  options={[
                    { value: 'Introduced', label: 'Introduced' },
                    { value: 'Referred', label: 'Referred' },
                    { value: 'Reported', label: 'Reported' },
                    { value: 'Failed', label: 'Failed' },
                    { value: 'Passed', label: 'Passed' },
                    { value: 'Enacted', label: 'Enacted' },
                    { value: 'Vetoed', label: 'Vetoed' },
                  ]}
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
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={submitting}
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" disabled={submitting} type={'submit'}>
                  {existingArtifact ? 'Update' : 'Add'}
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
      {existingArtifact ? (
        <ArtifactIntersections artifact={existingArtifact} reloadArtifact={reloadArtifact} />
      ) : (
        <Typography component={'h3'} variant={'subtitle1'} mt={4}>
          * Intersections may be added once an Artifact is saved
        </Typography>
      )}
    </>
  )
}

export default ArtifactForm
