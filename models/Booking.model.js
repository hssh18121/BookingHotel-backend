const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookingSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userInfo: {
      name: { type: String, maxLength: 255, minLength: 6 },
      phone: { type: String, maxLength: 11, minLength: 9 },
      email: { type: String, lowercase: true },
    },
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
/**
 *
 * @param {{checkIn: Date, checkOut: Date, room }} param
 * @returns
 */
BookingSchema.statics.isBooked = async function ({ checkIn, checkOut, room }) {
  const bookings = await this.find({
    room: room._id,
  });

  const isBooked = bookings.some((booking) => {
    const bookingCheckIn = new Date(booking.checkinAt);
    const bookingCheckOut = new Date(booking.checkoutAt);
    /**
     * -----------------bci-----------bco--------
     * ------------------------ci----------------co-------- => checkIn is between bookingCheckIn and bookingCheckOut
     * --------ci--------------co-------- => checkOut is between bookingCheckIn and bookingCheckOut
     */
    return (
      ((checkIn.getTime() >= bookingCheckIn.getTime() &&
        checkIn.getTime() <= bookingCheckOut.getTime()) || // checkIn is between bookingCheckIn and bookingCheckOut
        (checkOut.getTime() >= bookingCheckIn.getTime() &&
          checkOut.getTime() <= bookingCheckOut.getTime())) && // checkOut is between bookingCheckIn and bookingCheckOut
      booking.status !== "failure" // booking is not failed
    );
  });
  return isBooked;
};
module.exports = mongoose.model("Booking", BookingSchema);
