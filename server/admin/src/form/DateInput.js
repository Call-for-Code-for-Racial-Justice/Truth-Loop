import React from 'react'
import PropTypes from 'prop-types'
import { Controller, useFormState } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import FormControl from '@mui/material/FormControl'

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  required: PropTypes.bool,
}

function DateInput({ control, label, name, defaultValue, required, maxDate }) {
  const { errors } = useFormState({ control })
  const errorMessage = errors[name] ? errors[name].message : ''
  const rules = {}
  if (required) {
    rules.required = `${label} is required`
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        rules={rules}
        render={({ field }) => (
          <FormControl fullWidth error={!!errorMessage}>
            <DatePicker
              {...field}
              maxDate={maxDate}
              label={label}
              renderInput={(params) => (
                <TextField {...params} error={!!errorMessage} helperText={errorMessage} />
              )}
            />
          </FormControl>
        )}
      />
    </LocalizationProvider>
  )
}

export default DateInput
