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
      if (!ObjectId.isValid(req.params.hotelAdminId)) {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid hotel admin's id" });
      }
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
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async updateBooking(req, res) {
    const { roomId, bookingId, status } = req.body;
    if (!ObjectId.isValid(bookingId)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid booking's id" });
    }
    if (!ObjectId.isValid(roomId)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid room's id" });
    }
    try {
      await Booking.validate({ status }, ["status"]);
      const hotel = await Hotel.findOne({
        _id: req.params.hotelId,
        manager: req.user._id,
      });
      if (!hotel) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find hotel" });
      }
      const room = await Room.findOne({
        _id: roomId,
        hotel: hotel._id,
      });
      if (!room) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find room" });
      }
      const booking = await Booking.findOne({
        _id: bookingId,
        room: room._id,
      }).select("-__v");
      if (!booking) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find booking" });
      }
      booking.status = status;
      await booking.save();
      return res.status(200).json({ status: "success", data: { booking } });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          status: "error",
          message: error.message,
          hint: Booking.schema.path("status").enumValues,
        });
      }
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
  async updateHotel(req, res) {
    try {
      const { name, description, address, province, kinds, hotelFeatures } =
        req.body;
      await Hotel.validate({
        name,
        description,
        address,
        province,
        kinds,
        hotelFeatures,
      });
      let result = await Hotel.updateOne(
        { _id: req.params.hotelId, manager: req.user._id },
        { name, description, address, province, kinds, hotelFeatures }
      );
      if (result.matchedCount === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find hotel" });
      }
      return res.status(200).json({
        status: "success",
        data: {
          hotel: await Hotel.findOne({
            _id: req.params.hotelId,
            manager: req.user._id,
          }),
        },
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        console.log(error);
        return res
          .status(400)
          .json({ status: "error", message: error.message });
      }
      return res.status(500).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}

module.exports = {
  systemAdminController: new SystemAdminController(),
  hotelAdminController: new HotelAdminController(),
};
