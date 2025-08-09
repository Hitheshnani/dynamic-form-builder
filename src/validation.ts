import { ValidationRule } from '../types/form';

export const validateField = (value: any, rules: ValidationRule[]): string[] => {
  const errors: string[] = [];

  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors.push(rule.message || 'This field is required');
        }
        break;

      case 'minLength':
        if (value && typeof value === 'string' && value.length < (rule.value as number)) {
          errors.push(rule.message || `Minimum length is ${rule.value} characters`);
        }
        break;

      case 'maxLength':
        if (value && typeof value === 'string' && value.length > (rule.value as number)) {
          errors.push(rule.message || `Maximum length is ${rule.value} characters`);
        }
        break;

      case 'email':
        if (value && typeof value === 'string') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors.push(rule.message || 'Please enter a valid email address');
          }
        }
        break;

      case 'password':
        if (value && typeof value === 'string') {
          if (value.length < 8) {
            errors.push(rule.message || 'Password must be at least 8 characters long');
          } else if (!/\d/.test(value)) {
            errors.push(rule.message || 'Password must contain at least one number');
          }
        }
        break;

      case 'min':
        if (value !== '' && value !== null && value !== undefined) {
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue < (rule.value as number)) {
            errors.push(rule.message || `Minimum value is ${rule.value}`);
          }
        }
        break;

      case 'max':
        if (value !== '' && value !== null && value !== undefined) {
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue > (rule.value as number)) {
            errors.push(rule.message || `Maximum value is ${rule.value}`);
          }
        }
        break;

      default:
        // Optional: handle unknown rule types gracefully
        console.warn(`Unknown validation rule type: ${rule.type}`);
        break;
    }
  }

  return errors;
};
