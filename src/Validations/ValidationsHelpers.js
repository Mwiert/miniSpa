//

// gerekli mi
String.prototype.isRequired = function () {
  return this !== null && this !== undefined && this !== ''
}
//email format check
String.prototype.isEmail = function () {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(this)
}
//password format check
String.prototype.isPassword = function () {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return passwordPattern.test(this)
}
//sadece rakama izin verme kısmı
String.prototype.isNumber = function () {
  const numberPattern = /^[0-9]+$/
  return numberPattern.test(this)
}
//bu değişecek ama numara check bu hep ülke koduyla alınacak dropdowna bağlanacak
String.prototype.isPhone = function () {
  const phonePattern = /^\d{10}$/
  return phonePattern.test(this)
}
//sadece harfe izin verme kısmı
String.prototype.isAlphabetic = function () {
  const alphabeticPattern = /^[a-zA-Z]+$/
  return alphabeticPattern.test(this)
}
//harf ve rakama izin verme kısmı
String.prototype.isAlphaNumeric = function () {
  const alphaNumericPattern = /^[a-zA-Z0-9]*$/
  return alphaNumericPattern.test(this)
}
//harf ve rakama ve boşluğa izin verme kısmı
String.prototype.isAlphaNumericWithSpaces = function () {
  const alphaNumericPattern = /^[a-zA-Z0-9\s]*$/
  return alphaNumericPattern.test(this)
}
//harf ve rakama ve boşluksuz izin verme kısmı
String.prototype.isAlphaNumericWithNoSpaces = function () {
  const alphaNumericPattern = /^[a-zA-Z0-9]*$/
  return alphaNumericPattern.test(this)
}
//tarih formatı kontrolü
String.prototype.isDate = function () {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  return datePattern.test(this)
}
//tc kimlik kontrolü
String.prototype.isTc = function () {
  const tcPattern = /^\d{11}$/
  return tcPattern.test(this)
}
//verilen değerle eşit mi kontrolü bunu password belirlerken kullanıcıya iki kez sosrarsak kullanabiliriz diye düşündüm
String.prototype.isEqual = function (value) {
  return this === value
}
//url format kontrolü
String.prototype.isUrl = function () {
  const urlPattern = /^(http|https):\/\/[^ "]+$/
  return urlPattern.test(this)
}
//kredi kartı format kontrolü
String.prototype.isCreditCard = function () {
  const creditCardPattern = /^\d{16}$/
  return creditCardPattern.test(this)
}
//kredi kartı cvc format kontrolü
String.prototype.isCreditCardCvc = function () {
  const creditCardCvcPattern = /^\d{3,4}$/
  return creditCardCvcPattern.test(this)
}
//kredi kartı son kullanma tarihi format kontrolü
String.prototype.isCreditCardExpDate = function () {
  const creditCardExpDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/
  return creditCardExpDatePattern.test(this)
}
//posta kodu format kontrolü
String.prototype.isPostalCode = function () {
  const postalCodePattern = /^\d{5}$/
  return postalCodePattern.test(this)
}
String.prototype.isMinLength = function (length) {
  return this.length >= length
}
String.prototype.isMaxLength = function (length) {
  return this.length <= length
}
String.prototype.isMinValue = function (value) {
  return this >= value
}
String.prototype.isMaxValue = function (value) {
  return this <= value
}
String.prototype.isBetween = function (min, max) {
  return this >= min && this <= max
}
