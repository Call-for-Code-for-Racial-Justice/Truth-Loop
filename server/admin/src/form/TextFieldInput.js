import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { useFormState } from 'react-hook-form'

TextFieldInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
}

function TextFieldInput({ control, label, name, defaultValue, required }) {
  const { errors } = useFormState({
    control,
  })
  const errorMessage = errors[name] ? errors[name].message : ''
  const rules = {}
  if (required) {
    rules.required = `${label} is required`
  }
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      rules={rules}
      render={({ field }) => (
        <TextField
          label={label}
          fullWidth
          {...field}
          error={!!errorMessage}
          helperText={errorMessage}
        />
      )}
    />
  )
}

export default TextFieldInput
