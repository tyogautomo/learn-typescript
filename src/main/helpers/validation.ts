namespace App {
  // validation helper
  export interface Validatable {
    value: string | number;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
  }

  export const validator = (input: Validatable): boolean => {
    let isValid = true;
    if (input.required) {
      isValid = isValid && (input.value.toString().trim().length > 0);
    }
    if (typeof input.value === 'string') {
      if (input.maxLength != null) {
        isValid = isValid && (input.value.length <= input.maxLength);
      }
      if (input.minLength != null) {
        isValid = isValid && (input.value.length >= input.minLength);
      }
    }
    if (typeof input.value === 'number') {
      if (input.max) {
        isValid = isValid && (input.value <= input.max);
      }
      if (input.min) {
        isValid = isValid && (input.value >= input.min);
      }
    }
    return isValid;
  }
}
