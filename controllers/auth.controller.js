const User = require("../models").User;
const {
  validateUsername,
  validatePassword,
  validateEmail,
  validatePhoneNumber,
  validateFullName,
  validateRole,
} = require("../utils/validate");
class AuthController {
  async login(req = new Request(), res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }
    let validateErr = validateEmail(email) || validatePassword(password);
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
      if (!user.isActivated) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "User is not activated or has been blocked",
          });
      }
      return res.status(200).json({
        status: "success",
        data: {
          token: user.genToken(),
          expiresIn: process.env.JWT_EXPIRES_IN,
          username: user.username,
          userID: user.id,
        },
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async signup(req = new Request(), res) {
    const {
      username,
      password,
      confirmPassword,
      email,
      fullname,
      phone,
      role,
    } = req.body;
    if (!username || !password || !fullname || !email || !confirmPassword) {
      return res.status(400).json({
        status: "error",
        message:
          "Username, password, fullname, phoneNumber and email are required",
      });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Password must be the same" });
    }

    let validateErr =
      validateEmail(email) ||
      validatePassword(password) ||
      validateUsername(username) ||
      (phone ? validatePhoneNumber(phone) : false) ||
      validateFullName(fullname) ||
      validateRole(role);
    if (validateErr) {
      return res.status(400).json({ status: "error", message: validateErr });
    }
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ status: "error", message: "Email is already in use" });
      }
      new User({
        username,
        password,
        email,
        fullname,
        phone,
        role,
        isActivated: role == "hotel" ? false : undefined,
      }).saveWithHashPassword();

      return res.status(200).json({
        status: "success",
        message: "Signup successfully",
      });
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
module.exports = new AuthController();
