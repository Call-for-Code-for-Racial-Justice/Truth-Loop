import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import TextFieldInput from '../form/TextFieldInput'

const emptyFormValues = { name: '', description: '' }

function CategoryForm() {
  const location = useLocation()
  const existingCategory = location?.state?.category
  const { control, handleSubmit, reset } = useForm({
    defaultValues: existingCategory ? { ...existingCategory } : { ...emptyFormValues },
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const history = useHistory()

  const handleCloseFormError = function () {
    setFormError(false)
  }

  const cancel = function () {
    history.push('/categories')
  }

  const onSubmit = async function (values) {
    setSubmitting(true)
    const url = existingCategory
      ? `/api/v1/categories/${existingCategory.id}`
      : '/api/v1/categories'
    const categoriesResponse = await fetch(url, {
      method: existingCategory ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (categoriesResponse.ok) {
      history.push('/categories')
    } else {
      const errorText = await categoriesResponse.text()
      setSubmitting(false)
      setFormError(errorText)
    }
  }

  const resetForm = function () {
    reset()
  }

  return (
    <Paper elevation={12} data-testid={'addCategoryForm'} sx={{ p: 2 }}>
      <Typography component={'h2'} variant={'h6'} mb={2}>
        {existingCategory ? 'Edit' : 'Add'} Category
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item container spacing={2}>
            <Grid item lg={4} md={6} xs={12}>
              <TextFieldInput name={'name'} control={control} label={'Name'} required />
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
                {existingCategory ? 'Update' : 'Add'}
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

export default CategoryForm
