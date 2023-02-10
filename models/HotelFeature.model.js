const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelFeatureSchema = new Schema({
  name: { type: String, maxLength: 100, required: true, unique: true },
  description: { type: String, required: true },
  iconKeyword: { type: String, required: true },
});

const HotelFeature = mongoose.model("HotelFeature", HotelFeatureSchema);

module.exports = HotelFeature;
