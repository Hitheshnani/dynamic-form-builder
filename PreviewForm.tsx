import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  Divider,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'
import FormRenderer from '../components/FormRenderer'
import { FormData, FormValidationErrors } from '../types/form'
import { validateField } from '../utils/validation'

const PreviewForm: React.FC = () => {
  const navigate = useNavigate()
  const { currentForm } = useSelector((state: RootState) => state.formBuilder)
  const [formData, setFormData] = useState<FormData>({})
  const [validationErrors, setValidationErrors] = useState<FormValidationErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (!currentForm) {
      navigate('/create')
      return
    }

    // Initialize form data with default values
    const initialData: FormData = {}
    currentForm.fields.forEach(field => {
      initialData[field.id] = field.defaultValue
    })
    setFormData(initialData)
  }, [currentForm, navigate])

  const handleFormDataChange = (newData: FormData) => {
    setFormData(newData)
  }

  const handleValidationErrorsChange = (newErrors: FormValidationErrors) => {
    setValidationErrors(newErrors)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    
    // Validate all fields
    const errors: FormValidationErrors = {}
    currentForm?.fields.forEach(field => {
      const fieldErrors = validateField(formData[field.id], field.validationRules)
      if (fieldErrors.length > 0) {
        errors[field.id] = fieldErrors
      }
    })
    
    setValidationErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      alert('Form submitted successfully!')
      console.log('Form data:', formData)
    }
  }

  if (!currentForm) {
    return (
      <Box>
        <Alert severity="warning">
          No form to preview. Please create a form first.
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/create')}
          sx={{ mt: 2 }}
        >
          Go to Create Form
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Preview Form</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/create')}
        >
          Back to Editor
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {currentForm.name || 'Untitled Form'}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <FormRenderer
          fields={currentForm.fields}
          formData={formData}
          onFormDataChange={handleFormDataChange}
          validationErrors={validationErrors}
          onValidationErrorsChange={handleValidationErrorsChange}
        />

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            Submit Form
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setFormData({})
              setValidationErrors({})
              setIsSubmitted(false)
            }}
          >
            Reset Form
          </Button>
        </Box>

        {isSubmitted && Object.keys(validationErrors).length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Please fix the validation errors before submitting.
          </Alert>
        )}
      </Paper>
    </Box>
  )
}

export default PreviewForm
