String.prototype.isValidDateFormat = function () {
  const dateFormat1 = /^(\d{2})\/(\d{2})\/(\d{4})$/ // DD/MM/YYYY
  const dateFormat2 = /^(\d{2})-(\d{2})-(\d{4})$/ // DD-MM-YYYY
  const dateFormat3 = /^(\d{2})\.(\d{2})\.(\d{4})$/ // DD.MM.YYYY

  return dateFormat1.test(this) || dateFormat2.test(this) || dateFormat3.test(this)
}

// String.prototype.isValidDateFormat = function () {
//   const dateFormat7 =
//     /\b(0?[1-9]|[12][0-9]|3[01])[-./](0?[1-9]|1[0-2])[-./]\d{4}\b|\b(0?[1-9]|[12][0-9]|3[01])[-./](0?[1-9]|1[0-2])[-./]\d{4}\b/gm

//   return dateFormat7.test(this)
// }
