const bcrypt = require("bcrypt");
function hashPassword(password = "") {
  let salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
}
function comparePassword(password = "", hashPassword = "") {
  return bcrypt.compareSync(password, hashPassword);
}
module.exports = {};
