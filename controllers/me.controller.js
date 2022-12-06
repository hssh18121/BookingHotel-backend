const User = require("../models").User;
class MeController {
  /**
   * GET /api/me/:id
   */
  async getMe(req, res) {
    try {
      const user = await User.findById(req.user.id).select(
        "-password -__v -role"
      );
      return res.status(200).json({ status: "success", user });
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
}
module.exports = new MeController();
