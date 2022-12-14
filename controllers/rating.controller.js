const { Rating, Hotel } = require("../models/");
class RatingController {
  async rate(req, res) {
    const userId = req.user.id;
    const { star, comment } = req.body;
    const hotelId = req.params.hotelId;
    if (!star || star > 10 || star < 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Star must be between 0 to 10" });
    }
    try {
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res
          .status(403)
          .json({ status: "error", message: "Can't find hotel" });
      }
      const rating = await Rating.findOne({ user: userId, hotel: hotelId });
      if (rating) {
        return res.status(403).json({
          status: "error",
          message: "You have already rated this hotel",
        });
      }
      const newRating = new Rating({
        user: userId,
        hotel: hotelId,
        star,
        comment,
      });
      await newRating.save();
      return res
        .status(200)
        .json({ status: "success", message: "Rating successfully" });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async unRate(req, res) {
    const userId = req.user.id;
    const hotelId = req.params.hotelId;
    try {
      const rating = await Rating.findOne({ user: userId, hotel: hotelId });
      if (!rating) {
        return res.status(403).json({
          status: "error",
          message: "You have not rated this hotel",
        });
      }
      await rating.remove();
      return res
        .status(200)
        .json({ status: "success", message: "Unrating successfully" });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async updateRating(req, res) {
    const userId = req.user.id;
    const { star, comment } = req.body;
    const hotelId = req.params.hotelId;
    if (!star || star > 10 || star < 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Star must be between 0 to 10" });
    }
    try {
      const updateResult = await Rating.updateOne(
        { user: userId, hotel: hotelId },
        { star: star, comment: comment }
      );
      if (updateResult.matchedCount === 0) {
        return res.status(403).json({
          status: "error",
          message: "You have not rated this hotel",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Update rating successfully",
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
module.exports = new RatingController();
