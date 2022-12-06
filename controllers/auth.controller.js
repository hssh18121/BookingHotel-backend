const User = require("../models").User;
const {
  validateUsername,
  validatePassword,
  validateEmail,
  validatePhoneNumber,
  validateFullName,
} = require("../utils/validate");
class AuthController {
  async login(req = new Request(), res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Username and password are required",
      });
    }
    let validateErr = validateEmail(email) || validatePassword(email);
    if (validateErr) {
      return res.status(400).json({ status: "error", message: validateErr });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ status: "error", message: "User does not exist" });
      }
      if (!user.checkPassword(password)) {
        return res
          .status(400)
          .json({ status: "error", message: "Password is incorrect" });
      }
      return res.status(200).json({ status: "success", user: user });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async signup(req = new Request(), res) {
    const { username, password, email, fullname, phone } = req.body;
    if (!username || !password || !fullname || (!email && !phone)) {
      return res.status(400).json({
        status: "error",
        message: "Username, password, fullname and email are required",
      });
    }

    let validateErr =
      validateUsername(username) ||
      validatePassword(password) ||
      (email ? validateEmail(email) : validatePhoneNumber(phone)) ||
      validateFullName(fullname);
    if (validateErr) {
      return res.status(400).json({ status: "error", message: validateErr });
    }
    try {
      let user = await User.findOne({ username });
      if (user) {
        return res
          .status(403)
          .json({ status: "error", message: "Username is already in use" });
      }
      user = await User.findOne(email ? { email } : { phone });
      if (user) {
        return res.status(403).json({
          status: "error",
          message: "Email or phone number is already in use",
        });
      }
      user = new User({
        username,
        password,
        email,
        fullname,
        phone,
      }).save();
      return res
        .status(200)
        .json({ status: "success", message: "Signup successfully" });
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: `Service error. Please try again later`,
      });
    }
  }
}
module.exports = new AuthController();
