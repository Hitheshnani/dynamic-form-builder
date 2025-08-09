export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date'

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'password' | 'min' | 'max'
  value?: number | string
  message: string
}

export interface FormField {
  id: string
  type: FieldType
  label: string
  required: boolean
  defaultValue: string
  validationRules: ValidationRule[]
  options?: string[] // for select, radio
  isDerived: boolean
  parentFields: string[]
  formula?: string
  order: number
}

export interface FormSchema {
  id: string
  name: string
  fields: FormField[]
  createdAt: string
}

export interface FormData {
  [fieldId: string]: any
}

export interface FormValidationErrors {
  [fieldId: string]: string[]
}
