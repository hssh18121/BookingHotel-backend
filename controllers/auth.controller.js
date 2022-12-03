const User = require("../models").User;
class AuthController {
  async login(req = new Request(), res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        message: "Username and password are required",
      });
    }
    try {
      const user = await User.findOne({ username });
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
      return res.status(200).json(user);
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async signup(req = new Request(), res) {
    const { username, password, email, fullname } = req.body;
    if (!username || !password || !email || !fullname) {
      return res.status(400).json({
        status: "error",
        message: "Username, password, fullname and email are required",
      });
    }
    try {
      let user = await User.findOne({ username });
      if (user) {
        return res
          .status(403)
          .json({ status: "error", message: "Username is already in use" });
      }
      user = await User.findOne({ email });
      if (user) {
        return res
          .status(403)
          .json({ status: "error", message: "Email is already in use" });
      }
      user = new User({ username, password, email, fullname }).save();
      return res
        .status(200)
        .json({ status: "success", message: "Signup successfully" });
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: `Service error. Please try again later ${error.message}`,
      });
    }
  }
}
module.exports = new AuthController();
