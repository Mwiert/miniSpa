import '../Validations/ValidationsHelpers'

export function validateInput(value, rules, type) {
  const errors = []
  if (type === 'email') {
    if (rules.email && !value.isEmail()) {
      errors.push('email formati hatali')
    }
    if (rules.required && !value.isRequired()) {
      errors.push('bu alan zorunludur')
    }
  }
  if (type === 'password') {
    if (rules.password && !value.isPassword()) {
      errors.push('password formati hatali')
    }
    if (rules.required && !value.isRequired()) {
      errors.push('bu alan zorunludur')
    }
  }
  if (type === 'phone') {
    if (rules.phone && !value.isPhone()) {
      errors.push('phone formati hatali')
    }
    if (rules.required && !value.isRequired()) {
      errors.push('bu alan zorunludur')
    }
  }
  if (type === 'tc') {
    if (rules.tc && !value.isTc()) {
      errors.push('tc formati hatali')
    }
    if (rules.required && !value.isRequired()) {
      errors.push('bu alan zorunludur')
    }
  }
  if (type === 'date') {
    if (rules.date && !value.isDate()) {
      errors.push('date formati hatali')
    }
    if (rules.required && !value.isRequired()) {
      errors.push('bu alan zorunludur')
    }
  }
  if (type === 'number') {
    if (rules.number && !value.isNumber()) {
      errors.push('number formati hatali')
    }
    if (rules.required && !value.isRequired()) {
      errors.push('bu alan zorunludur')
    }
  }
  if (type === 'text') {
    if (rules.text && !value.isAlphaNumericWithSpaces()) {
      errors.push('text formati hatali')
    }
    if (rules.required && !value.isRequired()) {
      errors.push('bu alan zorunludur')
    }
  }
  return errors
}
