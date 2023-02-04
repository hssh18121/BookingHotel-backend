const validator = require("validator");
function validateEmail(email = "") {
  return validator.isEmail(email) ? false : "Email is invalid";
}
function validatePassword(password = "") {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
    ? false
    : "Password is too short (password length must be more than 8 characters)";
}
function validateUsername(username = "") {
  if (!validator.isAlphanumeric(username, "en-US")) {
    return "Username must contain: letters a-z, number 0-9, and _.";
  }
  if (!validator.isLength(username, { min: 6, max: 63 })) {
    return "Username must be between 6 and 63 characters";
  }
  return false;
}
function validateFullName(fullName = "") {
  return validator.isLength(fullName, { min: 6, max: 255 })
    ? false
    : "Full name must be between 6 and 255 characters";
}
function validatePhoneNumber(phoneNumber = "") {
  return validator.isMobilePhone(phoneNumber, "vi-VN")
    ? false
    : "Phone number is not valid";
}
function validateCheckInCheckOut({
  checkIn /**="2022-01-01" */,
  checkOut /**="2022-01-01" */,
}) {
  if (!checkIn || !checkOut) return "Check-in and check-out date are required";
  if (validator.isAfter(new Date().toISOString(), checkIn)) {
    return "Check-in date must be after today";
  }
  if (!validator.isBefore(checkIn, checkOut))
    return "Check-in date must be before check-out date";
  return false;
}
/**
 *
 * @param {string} role
 * @returns false if role is valid, otherwise return error message
 */
function validateRole(role) {
  let mess =
    isIn(role, ["user", "admin", "hotel"]) || !role ? false : "Role is invalid";
  if (role === "admin") return "Admin role is not allowed";
  return mess;
}
/**
 *
 * @param {any} key
 * @param {Array} values
 * @returns true if key is in values, otherwise return false
 */
function isIn(key, values) {
  return values.some((v) => v === key);
}
module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  validateFullName,
  validatePhoneNumber,
  validateCheckInCheckOut,
  validateRole,
};
