import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormSchema } from '../../types/form'
import { loadFormsFromStorage, saveFormsToStorage } from '../../utils/storage'

interface SavedFormsState {
  forms: FormSchema[]
  loading: boolean
}

const initialState: SavedFormsState = {
  forms: loadFormsFromStorage(),
  loading: false,
}

const savedFormsSlice = createSlice({
  name: 'savedForms',
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<FormSchema>) => {
      const existingIndex = state.forms.findIndex(f => f.id === action.payload.id)
      if (existingIndex !== -1) {
        state.forms[existingIndex] = action.payload
      } else {
        state.forms.push(action.payload)
      }
      saveFormsToStorage(state.forms)
    },
    deleteForm: (state, action: PayloadAction<string>) => {
      state.forms = state.forms.filter(f => f.id !== action.payload)
      saveFormsToStorage(state.forms)
    },
    loadForms: (state) => {
      state.forms = loadFormsFromStorage()
    },
  },
})

export const { saveForm, deleteForm, loadForms } = savedFormsSlice.actions

export default savedFormsSlice.reducer
