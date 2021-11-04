import React from 'react'
import PropTypes from 'prop-types'
import { useFormState, Controller } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

CheckboxInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
}

function CheckboxInput({ label, name, control, defaultValue, required }) {
  const { errors } = useFormState({ control })
  const errorMessage = errors[name] ? errors[name].message : ''
  const rules = {}
  if (required) {
    rules.required = `${label} is required`
  }
  return (
    <FormControl>
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
      {!!errorMessage ? <FormHelperText error={true}>{errorMessage}</FormHelperText> : null}
    </FormControl>
  )
}

export default CheckboxInput
