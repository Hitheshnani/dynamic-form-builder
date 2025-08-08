import { FormSchema } from '../types/form'

const STORAGE_KEY = 'dynamic-form-builder-forms'

export const saveFormsToStorage = (forms: FormSchema[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms))
  } catch (error) {
    console.error('Failed to save forms to localStorage:', error)
  }
}

export const loadFormsFromStorage = (): FormSchema[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load forms from localStorage:', error)
    return []
  }
}
