export function isRequired(value) {
  return value !== null && value !== undefined && value !== ''
}

//kullanmamız gereken yapı bu bir variable a ver onu test et
export function isEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(value)
}
export function isPassword(value) {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return passwordPattern.test(value)
}

export function isNumber(value) {
  const numberPattern = /^[0-9]+$/
  return numberPattern.test(value)
}

export function isAlphabetic(value) {
  const alphabeticPattern = /^[a-zA-Z]+$/
  return alphabeticPattern.test(value)
}

export function isMinLength(value, length) {
  return value.length >= length
}

export function isMaxLength(value, length) {
  return value.length <= length
}

export function isPhoneNumber(value) {
  const phoneNumberPattern = /^\d{10}$/
  return phoneNumberPattern.test(value)
}

//doğum tarihi input
export function isDate(value) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  return datePattern.test(value)
}

//TC kimlik
export function isTc(value) {
  const tcPattern = /^\d{11}$/
  return tcPattern.test(value)
}

export function isEqual(value1, value2) {
  return value1 === value2
}

export function isAlphaNumeric(value) {
  const alphaNumericPattern = /^[a-zA-Z0-9]*$/
  return alphaNumericPattern.test(value)
}

export function isAlphaNumericWithSpaces(value) {
  const alphaNumericPattern = /^[a-zA-Z0-9\s]*$/
  return alphaNumericPattern.test(value)
}
