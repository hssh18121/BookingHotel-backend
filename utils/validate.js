function validateEmail(email = "") {
  if (
    !email ||
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return "Email is invalid";
  }
  return false;
}
function validatePassword(password = "") {
  if (password.length < 6) {
    return "Password is too short (password length must be more than 6 characters)";
  }
  return false;
}
function validateUsername(username = "") {
  if (username.length < 6) {
    return "Username is too short (username length must be more than 6 characters)";
  }
  if (username.length > 63) {
    return "Username is too long (username length must be less than 63 characters)";
  }
  if (!username.match(/^[a-zA-Z0-9\_.]+$/)) {
    return "Username must contain: letters a-z, number 0-9, and _.";
  }
  return false;
}
function validateFullName(fullName = "") {
  let length = fullName.length;
  if (length < 6 || length > 255) {
    return "Full name must be between 6 and 255 characters";
  }
  return false;
}
function validatePhoneNumber(phoneNumber = "") {
  if (
    !phoneNumber.match(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    )
  ) {
    return "PhoneNumber is not valid";
  }
  return false;
}
module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  validateFullName,
  validatePhoneNumber,
};
