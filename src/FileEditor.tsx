import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material'
import { Delete, ExpandMore, ExpandLess } from '@mui/icons-material'
import { FormField, FieldType, ValidationRule } from '../types/form'

interface FieldEditorProps {
  field: FormField
  onUpdate: (field: Partial<FormField>) => void
  onDelete: () => void
  availableFields: FormField[]
}

const FieldEditor: React.FC<FieldEditorProps> = ({
  field,
  onUpdate,
  onDelete,
  availableFields,
}) => {
  const [expanded, setExpanded] = useState(false)

  const fieldTypes: { value: FieldType; label: string }[] = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number Input' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Dropdown' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date Picker' },
  ]

  const validationTypes = [
    { type: 'required', label: 'Required' },
    { type: 'minLength', label: 'Min Length' },
    { type: 'maxLength', label: 'Max Length' },
    { type: 'email', label: 'Email Format' },
    { type: 'password', label: 'Password Rules' },
    { type: 'min', label: 'Min Value' },
    { type: 'max', label: 'Max Value' },
  ]

  const addValidationRule = (type: string) => {
    const newRule: ValidationRule = {
      type: type as any,
      value: type === 'minLength' || type === 'maxLength' ? 10 : undefined,
      message: '',
    }
    onUpdate({
      validationRules: [...field.validationRules, newRule],
    })
  }

  const updateValidationRule = (index: number, rule: ValidationRule) => {
    const updatedRules = [...field.validationRules]
    updatedRules[index] = rule
    onUpdate({ validationRules: updatedRules })
  }

  const removeValidationRule = (index: number) => {
    const updatedRules = field.validationRules.filter((_, i) => i !== index)
    onUpdate({ validationRules: updatedRules })
  }

  const toggleDerived = () => {
    onUpdate({ isDerived: !field.isDerived })
  }

  const addParentField = (parentId: string) => {
    if (!field.parentFields.includes(parentId)) {
      onUpdate({ parentFields: [...field.parentFields, parentId] })
    }
  }

  const removeParentField = (parentId: string) => {
    onUpdate({
      parentFields: field.parentFields.filter(id => id !== parentId),
    })
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Field: {field.label || 'Untitled'}</Typography>
          <Box>
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <IconButton onClick={onDelete} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <TextField
            label="Field Label"
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Field Type</InputLabel>
            <Select
              value={field.type}
              onChange={(e) => onUpdate({ type: e.target.value as FieldType })}
              label="Field Type"
            >
              {fieldTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <TextField
            label="Default Value"
            value={field.defaultValue}
            onChange={(e) => onUpdate({ defaultValue: e.target.value })}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={field.required}
                onChange={(e) => onUpdate({ required: e.target.checked })}
              />
            }
            label="Required"
          />
        </Box>

        {(field.type === 'select' || field.type === 'radio') && (
          <TextField
            label="Options (comma-separated)"
            value={field.options?.join(', ') || ''}
            onChange={(e) => onUpdate({ options: e.target.value.split(',').map(s => s.trim()) })}
            fullWidth
            sx={{ mb: 2 }}
            helperText="Enter options separated by commas"
          />
        )}

        <FormControlLabel
          control={
            <Switch
              checked={field.isDerived}
              onChange={toggleDerived}
            />
          }
          label="Derived Field"
        />

        {field.isDerived && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Parent Fields:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {field.parentFields.map((parentId) => {
                const parentField = availableFields.find(f => f.id === parentId)
                return (
                  <Chip
                    key={parentId}
                    label={parentField?.label || parentId}
                    onDelete={() => removeParentField(parentId)}
                    color="primary"
                  />
                )
              })}
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Add Parent Field</InputLabel>
              <Select
                value=""
                onChange={(e) => addParentField(e.target.value)}
                label="Add Parent Field"
              >
                {availableFields
                  .filter(f => f.id !== field.id && !field.parentFields.includes(f.id))
                  .map((f) => (
                    <MenuItem key={f.id} value={f.id}>
                      {f.label || 'Untitled'}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Formula"
              value={field.formula || ''}
              onChange={(e) => onUpdate({ formula: e.target.value })}
              fullWidth
              multiline
              rows={2}
              helperText="e.g., Age derived from DOB"
            />
          </Box>
        )}

        <Collapse in={expanded}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Validation Rules
            </Typography>
            {field.validationRules.map((rule, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={rule.type}
                    onChange={(e) => updateValidationRule(index, { ...rule, type: e.target.value as any })}
                    size="small"
                  >
                    {validationTypes.map((v) => (
                      <MenuItem key={v.type} value={v.type}>
                        {v.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {(rule.type === 'minLength' || rule.type === 'maxLength' || rule.type === 'min' || rule.type === 'max') && (
                  <TextField
                    type="number"
                    value={rule.value || ''}
                    onChange={(e) => updateValidationRule(index, { ...rule, value: Number(e.target.value) })}
                    size="small"
                    sx={{ width: 100 }}
                  />
                )}
                <TextField
                  label="Error Message"
                  value={rule.message}
                  onChange={(e) => updateValidationRule(index, { ...rule, message: e.target.value })}
                  size="small"
                  sx={{ flexGrow: 1 }}
                />
                <IconButton onClick={() => removeValidationRule(index)} color="error" size="small">
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              size="small"
              onClick={() => addValidationRule('required')}
              sx={{ mt: 1 }}
            >
              Add Validation Rule
            </Button>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default FieldEditor
