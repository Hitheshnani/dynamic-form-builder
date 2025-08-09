import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Add, Save } from '@mui/icons-material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import {
  initializeForm,
  addField,
  updateField,
  removeField,
  reorderFields,
  setFormName,
  clearForm,
} from './formBuilderSlice'
import { saveForm } from './savedFormsSlice'
import FieldEditor from './FieldEditor'
import { FormField, FieldType } from './form'

const CreateForm: React.FC = () => {
  const dispatch = useDispatch()
  const { currentForm, isDirty } = useSelector((state: RootState) => state.formBuilder)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [dialogFormName, setDialogFormName] = useState('')
  const [showFieldDialog, setShowFieldDialog] = useState(false)
  const [newFieldType, setNewFieldType] = useState<FieldType>('text')

  useEffect(() => {
    dispatch(initializeForm())
  }, [dispatch])

  const handleAddField = () => {
    if (!currentForm) return

    const newField: FormField = {
      id: Date.now().toString(),
      type: newFieldType,
      label: '',
      required: false,
      defaultValue: '',
      validationRules: [],
      options: [],
      isDerived: false,
      parentFields: [],
      order: currentForm.fields.length,
    }

    dispatch(addField(newField))
    setShowFieldDialog(false)
  }

  const handleUpdateField = (fieldId: string, updates: Partial<FormField>) => {
    dispatch(updateField({ id: fieldId, field: updates }))
  }

  const handleDeleteField = (fieldId: string) => {
    dispatch(removeField(fieldId))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    dispatch(reorderFields({
      fromIndex: result.source.index,
      toIndex: result.destination.index,
    }))
  }

  const handleSaveForm = () => {
    if (!currentForm || !currentForm.name.trim()) return

    const formToSave = {
      ...currentForm,
      name: currentForm.name.trim(),
    }

    dispatch(saveForm(formToSave))
    setShowSaveDialog(false)
    setDialogFormName('')
  }

  const handleClearForm = () => {
    dispatch(clearForm())
    dispatch(initializeForm())
  }

  const handleFormNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormName(e.target.value))
  }

  if (!currentForm) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Create Form</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClearForm}
            disabled={!isDirty}
          >
            Clear Form
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={() => setShowSaveDialog(true)}
            disabled={!isDirty || currentForm.fields.length === 0}
          >
            Save Form
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          label="Form Name"
          value={currentForm.name}
          onChange={handleFormNameChange}
          fullWidth
          sx={{ mb: 3 }}
          placeholder="Enter form name..."
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Form Fields</Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setShowFieldDialog(true)}
          >
            Add Field
          </Button>
        </Box>

        {currentForm.fields.length === 0 ? (
          <Alert severity="info">
            No fields added yet. Click "Add Field" to start building your form.
          </Alert>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {currentForm.fields.map((field
