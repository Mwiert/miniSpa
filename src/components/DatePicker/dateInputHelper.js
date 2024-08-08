String.prototype.isValidDateFormat = function () {
  const dateFormat7 =
    /\b(0?[1-9]|[12][0-9]|3[01])[-./](0?[1-9]|1[0-2])[-./]\d{4}\b|\b(0?[1-9]|[12][0-9]|3[01])[-./](0?[1-9]|1[0-2])[-./]\d{4}\b/gm

  return dateFormat7.test(this)
}

