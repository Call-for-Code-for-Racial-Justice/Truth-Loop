import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

CheckboxInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
}

function CheckboxInput({ label, name, control, defaultValue, required }) {
  const rules = {}
  if (required) {
    rules.required = `${label} is required`
  }
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || false}
          rules={rules}
          render={({ field }) => <Checkbox checked={field.value} {...field} />}
        />
      }
      label={label}
    />
  )
}

export default CheckboxInput
