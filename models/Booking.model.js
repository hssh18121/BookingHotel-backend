const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookingSchema = new Schema(
  {
    hotel: { type: Schema.ObjectId, ref: "Hotel", required: true },
    room: { type: Schema.ObjectId, ref: "Room", required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["success", "failure", "processing"],
      required: true,
    },
    checkinAt: { type: Date },
    checkoutAt: { type: Date },
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
module.exports = mongoose.model("Booking", BookingSchema);
