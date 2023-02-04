const { User, Booking, Rating } = require("../models");
const {
  validatePassword,
  validateFullName,
  validatePhoneNumber,
  validateUsername,
} = require("../utils/validate");
const { uploadFile, deleteFile } = require("../utils/googleApi");
const { moongooseToObject, mongooseToObject } = require("../utils/mongoose");
class MeController {
  /**
   * GET /api/me/:id
   */
  async getMe(req, res) {
    try {
      const user = mongooseToObject(
        await User.findById(req.user.id).select("-password -__v -role")
      );
      const bookings = await Booking.find({ user: req.user.id }).select(
        "-user -__v"
      );
      const ratings = await Rating.find({ user: req.user.id }).select(
        "-user -__v"
      );
      user.bookings = bookings;
      user.ratings = ratings;
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
      const updateResult = await User.updateOne(
        { _id: req.user.id },
        { fullname, phone, username }
      );
      if (updateResult.matchedCount === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find user" });
      }
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
  /*
   * PUT /api/me/avatar
   */
  async updateAvatar(req, res) {
    try {
      const { avatar: file } = req.files;
      if (!file) {
        return res
          .status(400)
          .json({ status: "error", message: "avatar is required" });
      }
      file.name = Date.now() + file.name.slice(-4);
      const avatar = await uploadFile(file);
      const user = await User.findById(req.user.id);
      const updateResult = await User.updateOne(
        { _id: req.user.id },
        { avatar }
      );
      let oldAvatar = user.avatar;
      if (oldAvatar) {
        oldAvatar = oldAvatar.split("&").slice(-1)[0].split("=")[1];
        await deleteFile(oldAvatar);
      }

      return res.status(200).json({ status: "success", data: { avatar } });
    } catch (error) {
      console.log(error);
      if (error.message === "File must be jpg or jpeg") {
        return res
          .status(400)
          .json({ status: "error", message: "File must be jpg or jpeg" });
      }

      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
module.exports = new MeController();
