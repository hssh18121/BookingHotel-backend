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
      adults: { type: Number, min: 0, max: 5, required: true },
      child: { type: Number, min: 0, max: 5, required: true },
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
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    devices: [
      {
        deviceId: { type: Schema.Types.ObjectId, ref: "Device" },
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
