import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormField, FormSchema } from './form'

interface FormBuilderState {
  currentForm: FormSchema | null
  isDirty: boolean
}

const initialState: FormBuilderState = {
  currentForm: null,
  isDirty: false,
}

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    initializeForm: (state) => {
      if (!state.currentForm) {
        state.currentForm = {
          id: Date.now().toString(),
          name: '',
          fields: [],
          createdAt: new Date().toISOString(),
        }
      }
    },
    addField: (state, action: PayloadAction<FormField>) => {
      if (state.currentForm) {
        state.currentForm.fields.push(action.payload)
        state.isDirty = true
      }
    },
    updateField: (state, action: PayloadAction<{ id: string; field: Partial<FormField> }>) => {
      if (state.currentForm) {
        const fieldIndex = state.currentForm.fields.findIndex(f => f.id === action.payload.id)
        if (fieldIndex !== -1) {
          state.currentForm.fields[fieldIndex] = {
            ...state.currentForm.fields[fieldIndex],
            ...action.payload.field,
          }
          state.isDirty = true
        }
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      if (state.currentForm) {
        state.currentForm.fields = state.currentForm.fields.filter(f => f.id !== action.payload)
        state.isDirty = true
      }
    },
    reorderFields: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      if (state.currentForm) {
        const { fromIndex, toIndex } = action.payload
        const fields = [...state.currentForm.fields]
        const [movedField] = fields.splice(fromIndex, 1)
        fields.splice(toIndex, 0, movedField)
        
        fields.forEach((field, index) => {
          field.order = index
        })
        
        state.currentForm.fields = fields
        state.isDirty = true
      }
    },
    setFormName: (state, action: PayloadAction<string>) => {
      if (state.currentForm) {
        state.currentForm.name = action.payload
        state.isDirty = true
      }
    },
    loadForm: (state, action: PayloadAction<FormSchema>) => {
      state.currentForm = action.payload
      state.isDirty = false
    },
    clearForm: (state) => {
      state.currentForm = null
      state.isDirty = false
    },
    setDirty: (state, action: PayloadAction<boolean>) => {
      state.isDirty = action.payload
    },
  },
})

export const {
  initializeForm,
  addField,
  updateField,
  removeField,
  reorderFields,
  setFormName,
  loadForm,
  clearForm,
  setDirty,
} = formBuilderSlice.actions

export default formBuilderSlice.reducer
