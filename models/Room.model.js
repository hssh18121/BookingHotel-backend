const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoomSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 63,
      required: true,
    },
    peopleAmount: {
      adults: { type: Number, max: 5 },
      child: { type: Number, max: 5 },
    },
    description: {
      type: String,
      maxLength: 1023,
    },
    image: [{ type: String, default: "" }],
    price: {
      type: Number,
      required: true,
    },
    size: { type: Number, default: 0 },
    hotel: { type: Schema.ObjectId, ref: "Hotel" },
    devices: [
      {
        deviceId: { type: Schema.ObjectId, ref: "Device" },
        amount: { type: Number },
      },
    ],
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
module.exports = mongoose.model("Room", RoomSchema);
