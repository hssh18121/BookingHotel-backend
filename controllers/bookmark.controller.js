const Bookmark = require("../models").Bookmark;
const ObjectId = require("mongoose").Types.ObjectId;
class BookmarkController {
  async create(req, res) {
    try {
      if (!ObjectId.isValid(req.params.hotelId)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid hotel's id",
        });
      }
      let bookmark = await Bookmark.findOne({
        user: req.user._id,
        hotel: req.params.hotelId,
      });
      if (bookmark) {
        return res.status(400).json({
          status: "error",
          message: "You have already bookmarked this hotel",
        });
      }
      bookmark = new Bookmark({
        user: req.user._id,
        hotel: req.params.hotelId,
      });
      await bookmark.save();
      return res.status(201).json({
        status: "success",
        data: { bookmark },
      });
    } catch (error) {
      console.log(error);
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async delete(req, res) {
    try {
      if (!ObjectId.isValid(req.params.hotelId)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid hotel's id",
        });
      }
      const bookmark = await Bookmark.findOneAndDelete({
        user: req.user._id,
        hotel: req.params.hotelId,
      });
      if (!bookmark) {
        return res.status(400).json({
          status: "error",
          message: "You have not bookmarked this hotel",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Bookmark deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
module.exports = new BookmarkController();
