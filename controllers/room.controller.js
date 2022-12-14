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
}
module.exports = new RoomController();
