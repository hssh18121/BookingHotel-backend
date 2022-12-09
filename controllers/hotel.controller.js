const { Hotel, Room } = require("../models");
const isValid = require("mongoose").Types.ObjectId.isValid;
const slice = require("../utils/slice");
class HotelController {
  //
  async getAll(req, res) {
    const { limit, from, to /*sort, asc*/ } = req.query;
    try {
      let hotels = slice(await Hotel.find({}), limit, from, to);
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
      return res.status(200).json({ status: "success", data: { hotel } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  //
  async getRooms(req = new Request(), res) {
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
      let rooms = await Promise.all(
        hotel.rooms.map(async (id) => {
          return Room.findById(id);
        })
      );
      const { limit, from, to, sort, asc } = req.query;
      rooms = slice(rooms, limit, from, to);
      return res.status(200).json({ status: "success", data: { rooms } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later" + error.stack,
      });
    }
  }
  //GET /api/hotels/province/:province
  async getByProvince(req = new Request(), res = new Response()) {
    const province = req.params.province;
    try {
      const { limit, from, to, sort, asc } = req.query;
      const hotels = slice(
        await Hotel.find({ province: province }),
        limit,
        from,
        to
      );
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
