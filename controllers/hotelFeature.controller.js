const HotelFeature = require("../models").HotelFeature;
const slice = require("../utils/slice");

class HotelFeatureController {
  async getAll(req, res) {
    try {
      const hotelFeatures = slice(await HotelFeature.find({}), req.query);
      return res
        .status(200)
        .json({ status: "success", data: { hotelFeatures } });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}

module.exports = new HotelFeatureController();
