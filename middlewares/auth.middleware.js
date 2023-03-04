const jwt = require("jsonwebtoken");
const { User, Hotel } = require("../models");
class Authorization {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {function} next next middleware
   */
  async protect(req, res, next) {
    const auth = req.headers.authorization;

    if (!auth?.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ status: "error", message: "Authorization failed" });
    }
    const token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res
          .status(401)
          .json({ status: "error", message: "User does not exist" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ status: "error", message: "Token expired" });
      }
    }
  }
  /**
   * @brief check if hotel admin is activated
   * @param {Request} req
   * @param {Response} res
   */
  async isActivated(req, res) {
    const user = req.user;
    if (!user.isActivated) {
      return res
        .status(403)
        .json({ status: "error", message: "You are not activated" });
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
  }

  isHotelAdmin(req, res, next) {
    const user = req.user;
    if (user.role !== "hotel") {
      return res
        .status(403)
        .json({ status: "error", message: "You are not hotel admin" });
    }
    if (!user.isActivated)
      return res
        .status(403)
        .json({ status: "error", message: "You are not activated" });
    next();
  }

  isAdmin(req, res, next) {
    const user = req.user;
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ status: "error", message: "You are not admin" });
    }
    next();
  }
  async isHasPermission(req, res, next) {
    try {
      const user = req.user;
      const hotelId = req.params.hotelId;
      const hotel = await Hotel.findById(hotelId);
      if (
        !hotel ||
        (hotel.manager?.toString() !== user._id.toString() &&
          user.role !== "admin")
      ) {
        res.status(403).json({
          status: "error",
          message: hotel
            ? "You are not allowed to manage this hotel"
            : "Hotel does not exist",
        });
      } else {
        req.hotel = hotel;
        next();
      }
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}
module.exports = new Authorization();
