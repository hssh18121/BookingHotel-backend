const User = require("../models").User;
const {
  validatePassword,
  validateFullName,
  validatePhoneNumber,
  validateUsername,
} = require("../utils/validate");
class MeController {
  /**
   * GET /api/me/:id
   */
  async getMe(req, res) {
    try {
      const user = await User.findById(req.user.id).select(
        "-password -__v -role"
      );
      return res.status(200).json({ status: "success", data: { user } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  /**
   *  GET /api/me/booking
   */
  getBookings(req, res) {}
  /**
   * PUT /api/me/password
   */
  async changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid password" });
    }
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "New password must be different" });
    }
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find user" });
      }
      const isMatch = user.checkPassword(oldPassword);
      if (!isMatch) {
        return res
          .status(400)
          .json({ status: "error", message: "Old password is incorrect" });
      }
      if (validatePassword(newPassword)) {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid password" });
      }
      user.setPassword(newPassword);
      console.log(newPassword, user.password);
      await User.updateOne({ _id: user._id }, { password: user.password });
      return res
        .status(200)
        .json({ status: "success", message: "Change Password Success" });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  /*
   * PUT /api/me/profile
   */
  async updateProfile(req, res) {
    const { username, fullname, phone } = req.body;
    const validateErr =
      validateUsername(username) ||
      validateFullName(fullname) ||
      validatePhoneNumber(phone);
    if (validateErr) {
      return res.status(400).json({ status: "error", message: validateErr });
    }
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find user" });
      }
      user.fullname = fullname;
      user.phone = phone;
      user.username = username;

      await User.updateOne({ _id: user._id }, { fullname, phone, username });
      return res
        .status(200)
        .json({ status: "success", message: "Update Profile Success" });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
module.exports = new MeController();
