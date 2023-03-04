const Room = require("../models").Room;
const slice = require("../utils/slice");
const isValid = require("mongoose").Types.ObjectId.isValid;
class RoomController {
  // GET /api/room/all
  async getAll(req, res) {
    try {
      const rooms = slice(await Room.find({}), req.query);
      return res.status(200).json({ status: "success", data: { rooms } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  // GET /api/room/:id
  async getRoom(req, res) {
    const roomId = req.params.id;
    if (!isValid(roomId)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid room's id" });
    }
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        return res
          .status(403)
          .json({ status: "error", message: "Can't find room" });
      }
      return res.status(200).json({ status: "success", data: { room } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }

  // API for admin
  async createRoom(req, res) {
    try {
      const attr = { ...req.body, hotel: req.params.hotelId };
      await Room.validate(attr);
      const room = await Room.create(attr);
      res.status(200).json({ status: "success", data: { room } });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
      res.status(500).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async updateRoom(req, res) {
    try {
      const attr = { ...req.body, hotel: req.params.hotelId };
      await Room.validate(attr);
      const room = await Room.findOneAndUpdate(
        {
          _id: req.params.roomId,
          hotel: req.params.hotelId,
        },
        attr
      );
      if (!room) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find room" });
      }
      res.status(200).json({ status: "success", message: "Update success" });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async deleteRoom(req, res) {
    try {
      const room = await Room.findOneAndDelete({
        _id: req.params.roomId,
        hotel: req.params.hotelId,
      });
      if (!room) {
        return res
          .status(400)
          .json({ status: "error", message: "Can't find room" });
      }
      res.status(200).json({ status: "success", message: "Delete success" });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
module.exports = new RoomController();
