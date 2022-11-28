const mongoose = require("mongoose");
const validator = require("validator");
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A hotel must have a name"],
  },
  star: {
    type: Number,
  },
  rating: {
    type: Number,
    required: [true, "A hotel must have a rating"],
  },
  location: {
    type: String,
    required: [true, "A location must be provided for a hotel"],
  },
  description: {
    type: String,
    required: [true, "A hotel must have at least a brief description"],
  },
  roomAvailable: {
    type: Number,
    required: [true],
  },
  images: [String],
});

const Hotel = mongoose.model("Hotel", hotelSchema);

// const testHotel = new Hotel({
//   name: "test hotel 2",
//   star: 4.5,
//   rating: 9,
//   location: "test street test district test city",
//   description: "This is a test descripion",
//   roomAvailable: 10,
// });
// testHotel.save();

module.exports = Hotel;
