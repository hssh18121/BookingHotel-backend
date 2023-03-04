const { Rating, Hotel, User } = require("../models/");
const { multipleMongooseToObject } = require("../utils/mongoose");
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
      return res.status(200).json({ status: "success", data: newRating });
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
  async delete(req, res) {
    let ratingId = req.params.ratingId;
    try {
      const rating = await Rating.findOneAndDelete({ _id: ratingId });
      if (!rating) {
        return res.status(403).json({
          status: "error",
          message: "Rating not found",
        });
      }
      res
        .status(200)
        .json({ status: "success", message: "Delete rating successfully" });
    } catch (error) {
      res.status(503).json({
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
  async getRating(req, res) {
    try {
      const hotel = await Hotel.findById(req.params.hotelId);
      if (!hotel) {
        return res
          .status(403)
          .json({ status: "error", message: "Can't find hotel" });
      }
      const results = multipleMongooseToObject(
        await Rating.find({ hotel: hotel._id }).select("-hotel -__v")
      );
      let ratings = await Promise.all(
        results.map(async (result) => {
          const user = await User.findById(result.user).select(
            "id username avatar"
          );
          result.user = user;
          return result;
        })
      );
      if (req.query.star) {
        ratings = ratings.filter((rating) => {
          return rating.star >= req.query.star;
        });
      }
      const starAvg = ratings.reduce((p, n) => p + n.star, 0) / ratings.length;
      return res
        .status(200)
        .json({ status: "success", data: { ratings, starAvg } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
module.exports = new RatingController();
