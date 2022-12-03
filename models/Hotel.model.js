const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 127,
      required: true,
    },
    star: {
      type: Number,
      max: 5,
      min: 0,
      required: true,
    },
    ratings: [
      {
        uid: { type: Schema.ObjectId, ref: "User" },
        comment: {
          type: String,
          maxLength: 255,
        },
        star: { type: Number, max: 5, min: 0 },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    city: { type: String, enum: ["Hà Nội", "TP.Hồ Chí Minh"] },
    address: {
      type: String,
      maxLength: 255,
      required: true,
    },
    description: {
      type: String,
      maxLength: 1023,
    },
    image: [
      {
        type: String,
        default: "",
      },
    ],
    kinds: {
      type: String,
      enum: [
        "Commercial",
        "Resort",
        "Airport",
        "Casino",
        "Hostel",
        "Motel",
        "Floating",
        "Condotel",
        "Residences",
        "Serviced Apartment",
        "Pod",
      ],
    },
    rooms: [{ roomid: { type: Schema.ObjectId, ref: "Room" } }],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Hotel", HotelSchema);
