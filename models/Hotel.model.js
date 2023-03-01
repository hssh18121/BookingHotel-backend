const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelFeature = require("./HotelFeature.model");
const HotelSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 127,
      required: true,
    },
    province: { type: String, maxLength: 63, required: true },
    address: {
      type: String,
      maxLength: 255,
      required: true,
    },
    description: {
      type: String,
      maxLength: 1023,
    },
    image: {
      type: String,
      default: "",
    },
    imageLibrary: [
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
    hotelFeatures: [
      {
        type: Schema.Types.ObjectId,
        ref: "HotelFeature",
        validate: async function (hotelFeaturesId) {
          const hotelFeature = await HotelFeature.findById(hotelFeaturesId);
          if (!hotelFeature)
            throw new Error(`Can't find hotel feature ${hotelFeaturesId}`);
          return true;
        },
      },
    ],
    manager: { type: Schema.Types.ObjectId, ref: "User" },
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
