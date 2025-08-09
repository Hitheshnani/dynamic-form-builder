import { FormField, FormData } from '../types/form'

export const calculateDerivedValue = (
  field: FormField,
  formData: FormData,
  allFields: FormField[]
): any => {
  if (!field.isDerived || !field.formula) {
    return formData[field.id] || field.defaultValue
  }

  try {
    // Simple formula evaluation - in a real app, you'd use a proper expression parser
    const formula = field.formula.toLowerCase()
    
    if (formula.includes('age') && formula.includes('dob')) {
      const dobField = field.parentFields.find(parentId => {
        const parentField = allFields.find(f => f.id === parentId)
        return parentField?.type === 'date'
      })
      
      if (dobField && formData[dobField]) {
        const dob = new Date(formData[dobField])
        const today = new Date()
        const age = today.getFullYear() - dob.getFullYear()
        const monthDiff = today.getMonth() - dob.getMonth()
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          return age - 1
        }
        return age
      }
    }

    // Add more formula types as needed
    return formData[field.id] || field.defaultValue
  } catch (error) {
    console.error('Error calculating derived value:', error)
    return formData[field.id] || field.defaultValue
  }
}
