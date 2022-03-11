import React from 'react'
import PropTypes from 'prop-types'
import { Controller, useFormState } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
}

function SelectInput({ control, label, name, defaultValue, required, options }) {
  const { errors } = useFormState({ control })
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
        <FormControl fullWidth error={!!errorMessage}>
          <InputLabel id={`${name}-select`}>{label}</InputLabel>
          <Select {...field} label={label} labelId={`${name}-select`}>
            {options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              )
            })}
          </Select>
          {!!errorMessage ? <FormHelperText>{errorMessage}</FormHelperText> : null}
        </FormControl>
      )}
    />
  )
}

export default SelectInput
