import React from 'react'
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Typography,
} from '@mui/material'
import { FormField, FormData, FormValidationErrors } from '../types/form'
import { validateField } from '../utils/validation'
import { calculateDerivedValue } from '../utils/derivedFields'

interface FormRendererProps {
  fields: FormField[]
  formData: FormData
  onFormDataChange: (data: FormData) => void
  validationErrors: FormValidationErrors
  onValidationErrorsChange: (errors: FormValidationErrors) => void
}

const FormRenderer: React.FC<FormRendererProps> = ({
  fields,
  formData,
  onFormDataChange,
  validationErrors,
  onValidationErrorsChange,
}) => {
  const sortedFields = [...fields].sort((a, b) => a.order - b.order)

  const handleFieldChange = (fieldId: string, value: any) => {
    const newFormData = { ...formData, [fieldId]: value }
    onFormDataChange(newFormData)

    // Validate the field
    const field = fields.find(f => f.id === fieldId)
    if (field) {
      const errors = validateField(value, field.validationRules)
      const newValidationErrors = { ...validationErrors, [fieldId]: errors }
      onValidationErrorsChange(newValidationErrors)
    }

    // Update derived fields
    updateDerivedFields(fieldId, newFormData)
  }

  const updateDerivedFields = (changedFieldId: string, currentFormData: FormData) => {
    const derivedFields = fields.filter(f => f.isDerived && f.parentFields.includes(changedFieldId))
    
    derivedFields.forEach(field => {
      const derivedValue = calculateDerivedValue(field, currentFormData, fields)
      const newFormData = { ...currentFormData, [field.id]: derivedValue }
      onFormDataChange(newFormData)
    })
  }

  const renderField = (field: FormField) => {
    const value = formData[field.id] || field.defaultValue
    const errors = validationErrors[field.id] || []
    const hasError = errors.length > 0

    const commonProps = {
      fullWidth: true,
      error: hasError,
      helperText: errors.join(', '),
      disabled: field.isDerived,
    }

    switch (field.type) {
      case 'text':
        return (
          <TextField
            {...commonProps}
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        )

      case 'number':
        return (
          <TextField
            {...commonProps}
            label={field.label}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        )

      case 'textarea':
        return (
          <TextField
            {...commonProps}
            label={field.label}
            multiline
            rows={4}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        )

      case 'select':
        return (
          <FormControl {...commonProps}>
            <FormLabel>{field.label}</FormLabel>
            <Select
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              disabled={field.isDerived}
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText error>{errors.join(', ')}</FormHelperText>}
          </FormControl>
        )

      case 'radio':
        return (
          <FormControl {...commonProps}>
            <FormLabel>{field.label}</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio disabled={field.isDerived} />}
                  label={option}
                />
              ))}
            </RadioGroup>
            {hasError && <FormHelperText error>{errors.join(', ')}</FormHelperText>}
          </FormControl>
        )

      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(value)}
                onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                disabled={field.isDerived}
              />
            }
            label={field.label}
          />
        )

      case 'date':
        return (
          <TextField
            {...commonProps}
            label={field.label}
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            InputLabelProps={{ shrink: true }}
          />
        )

      default:
        return null
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {sortedFields.map((field) => (
        <Box key={field.id}>
          {field.isDerived && (
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Derived Field
            </Typography>
          )}
          {renderField(field)}
        </Box>
      ))}
    </Box>
  )
}

export default FormRenderer
