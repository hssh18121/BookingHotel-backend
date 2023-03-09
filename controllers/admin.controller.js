const { User, Hotel, Room, Booking } = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;
const multipleMongooseToObject =
  require("../utils/mongoose").multipleMongooseToObject;
class SystemAdminController {
  /**
   * @brief activate hotel admin (api/admin/system/activate/:id)
   * @param {Request} req
   * @param {Response} res
   */
  async activate(req, res) {
    try {
      let result = await User.updateOne(
        {
          _id: req.params.id,
          $or: [{ role: "hotel" }, { role: "user" }],
        },
        { isActivated: true }
      );
      if (result.matchedCount === 0) {
        return res.status(400).json({
          status: "error",
          message:
            "You can only activate the user's account or the hotel admin's account",
        });
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
  async block(req, res) {
    try {
      let result = await User.updateOne(
        {
          _id: req.params.id,
          $or: [{ role: "hotel" }, { role: "user" }],
        },
        { isActivated: false }
      );
      if (result.matchedCount === 0) {
        return res.status(400).json({
          status: "error",
          message:
            "You can only block the user's account or the hotel admin's account",
        });
      }
      return res
        .status(200)
        .json({ status: "success", message: "Block successfully!" });
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
  async updateManager(req, res) {
    try {
      const hotelId = req.body.hotelId;
      if (!ObjectId.isValid(hotelId)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid hotel id",
        });
      }
      await Hotel.updateOne(
        { _id: hotelId },
        { manager: req.params.managerId }
      );
      res
        .status(200)
        .json({ status: "success", message: "Update successfully" });
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async removeManager(req, res) {
    try {
      const hotelId = req.body.hotelId;
      if (!ObjectId.isValid(hotelId)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid hotel id",
        });
      }
      await Hotel.updateOne({ _id: hotelId }, { $unset: { manager: "" } });
      res
        .status(200)
        .json({ status: "success", message: "Remove manager successfully" });
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async getStatistics(req, res) {
    try {
      const statistics = {};
      statistics.totalUsers = await User.countDocuments({ role: "user" });
      //Doanh thu đặt phòng
      const totalRevenue = await Booking.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$price" },
            count: { $sum: 1 },
          },
        },
      ]);
      statistics.totalRevenue = totalRevenue[0].total;
      statistics.totalBookings = totalRevenue[0].count;
      statistics.totalHotels = await Hotel.countDocuments();
      statistics.totalRooms = await Room.countDocuments();
      res.status(200).json({ status: "success", data: { statistics } });
    } catch (error) {
      console.log(error);
      res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find({ role: "user" }).select("-__v -password");
      res.status(200).json({ status: "success", data: { users } });
    } catch (error) {
      console.log(error);
      res.status(503).json({
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
