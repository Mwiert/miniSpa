import { isEmail, isRequired, isMinLength, isMaxLength } from '../Validations/ValidationsHelpers'

export function validateInput(value, rules) {
  const errors = []
  if (rules.email && !isEmail(value)) {
    errors.push('email formati hatali')
  }
  if (rules.required && !isRequired(value)) {
    errors.push('bu alan zorunludur')
  }
  if (rules.minLength && !isMinLength(value, rules.minLength)) {
    errors.push(`bu alan en az ${rules.minLength} karakter olmalıdır`)
  }
  if (rules.maxLength && !isMaxLength(value, rules.maxLength)) {
    errors.push(`bu alan en fazla ${rules.maxLength} karakter olmalıdır`)
  }
  // if (rules.isTc) {
  //   if (!isTc(value)) {
  //     errors.push('TC kimlik numarası 11 haneli olmalıdır')
  //   }
  // }

  return errors
}
