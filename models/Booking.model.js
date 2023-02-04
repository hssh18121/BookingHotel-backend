const mongoose = require("mongoose");
const { Booking } = require(".");
const Schema = mongoose.Schema;
const BookingSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["success", "failure", "processing"],
      default: "processing",
      required: true,
    },
    price: { type: Number, required: true },
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

BookingSchema.statics.isBooked = async ({ checkIn, checkOut, room }) => {
  const { Booking } = require(".");
  const bookings = await Booking.find({
    room: room._id,
  });

  const isBooked = bookings.some((booking) => {
    const bookingCheckIn = new Date(booking.checkinAt);
    const bookingCheckOut = new Date(booking.checkoutAt);
    return (
      (checkIn.getTime() >= bookingCheckIn.getTime() &&
        checkIn.getTime() <= bookingCheckOut.getTime()) ||
      (checkOut.getTime() >= bookingCheckIn.getTime() &&
        checkOut.getTime() <= bookingCheckOut.getTime())
    );
  });
  return isBooked;
};
module.exports = mongoose.model("Booking", BookingSchema);
