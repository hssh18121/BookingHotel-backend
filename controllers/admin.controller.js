const { User, Hotel, Room, Booking } = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;
const multipleMongooseToObject =
  require("../utils/mongoose").multipleMongooseToObject;
class SystemAdminController {
  /**
   * @brief activate hotel admin (api/admin/system/activate/:hotelAdminId)
   * @param {Request} req
   * @param {Response} res
   */
  async activateHotelAdmin(req, res) {
    try {
      let result = await User.updateOne(
        { _id: req.params.hotelAdminId, role: "hotel" },
        { isActivated: true }
      );
      if (result.matchedCount === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find hotel admin" });
      }
      return res
        .status(200)
        .json({ status: "success", message: "Activate successfully!" });
    } catch (error) {
      console.log(error);
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  /**
   * @brief get all hotel admins (api/admin/system/hotel-admins)
   * @param {Request} req
   * @param {Response} res
   */
  async getHotelAdmins(req, res) {
    try {
      const query = req.query;
      const hotelAdmins = await User.find({ role: "hotel", ...query }).select(
        "-password -__v"
      );
      return res.status(200).json({ status: "success", data: hotelAdmins });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
class HotelAdminController {
  async getHotels(req, res) {
    try {
      /**
       * @type {Array<Hotel>}
       */
      let hotels = multipleMongooseToObject(
        await Hotel.find({ manager: req.user._id }).select("-__v -manager")
      );
      for await (let hotel of hotels) {
        hotel.rooms = multipleMongooseToObject(
          await Room.find({ hotel: hotel._id }).select("-__v -hotel")
        );
        for await (let room of hotel.rooms) {
          room.bookings = multipleMongooseToObject(
            await Booking.find({ room: room._id }).select("-__v -room")
          );
        }
      }
      return res.status(200).json({ status: "success", data: { hotels } });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  getHotelKinds(req, res) {
    res
      .status(200)
      .json({ status: "success", data: Hotel.schema.path("kinds").enumValues });
  }
}

module.exports = {
  systemAdminController: new SystemAdminController(),
  hotelAdminController: new HotelAdminController(),
};
