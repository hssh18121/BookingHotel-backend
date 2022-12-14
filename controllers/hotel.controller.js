const { Hotel, Room, Rating } = require("../models");
const isValid = require("mongoose").Types.ObjectId.isValid;
const slice = require("../utils/slice");
class HotelController {
  //
  async getAll(req, res) {
    try {
      const hotels = slice(await Hotel.find({}), req.query);
      return res.status(200).json({ status: "success", data: { hotels } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async getHotel(req, res) {
    const id = req.params.id;
    if (!isValid(id)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid hotel's id" });
    }
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        return res
          .status(403)
          .json({ status: "error", message: "Can't find hotel" });
      }
      const rooms = await Room.find({ hotel: hotel._id }).select("-hotel");
      const ratings = await Rating.find({ hotel: hotel._id }).select(
        "-hotel -__v"
      );
      return res
        .status(200)
        .json({ status: "success", data: { hotel, rooms, ratings } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  //
  // async getRooms(req = new Request(), res) {
  //   const id = req.params.id;
  //   if (!isValid(id)) {
  //     return res
  //       .status(400)
  //       .json({ status: "error", message: "Invalid hotel's id" });
  //   }
  //   try {
  //     const hotel = await Hotel.findById(id);
  //     if (!hotel) {
  //       return res
  //         .status(403)
  //         .json({ status: "error", message: "Can't find hotel" });
  //     }
  //     let rooms = await Promise.all(
  //       hotel.rooms.map(async (id) => {
  //         return Room.findById(id);
  //       })
  //     );
  //     rooms = slice(rooms, req.query);
  //     return res.status(200).json({ status: "success", data: { rooms } });
  //   } catch (error) {
  //     return res.status(503).json({
  //       status: "error",
  //       message: "Service error. Please try again later",
  //     });
  //   }
  // }
  //GET /api/hotels/province/:province
  async getByProvince(req = new Request(), res = new Response()) {
    const province = req.params.province;
    try {
      const hotels = slice(await Hotel.find({ province: province }), req.query);
      return res.status(200).json({ status: "success", data: { hotels } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
module.exports = new HotelController();
