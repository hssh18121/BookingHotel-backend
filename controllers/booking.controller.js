const { User, Room, Booking } = require("../models");
const { validateCheckInCheckOut } = require("../utils/validate");
class BookingController {
  // ...
  async booking(req, res) {
    const user = req.user;
    const validateErr = validateCheckInCheckOut(req.body);
    if (validateErr) {
      return res.status(400).json({ status: "error", message: validateErr });
    }
    try {
      const room = await Room.findById(req.params.roomId);
      if (!room) {
        return res.status(400).json({
          status: "error",
          message: "Room not found",
        });
      }
      let { checkIn, checkOut } = req.body;
      checkIn = new Date(checkIn);
      checkOut = new Date(checkOut);

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
      if (isBooked) {
        return res.status(400).json({
          status: "error",
          message: "Room is booked",
        });
      }
      const rentalDays =
        new Date(checkOut.getTime() - checkIn.getTime()).getDate() - 1;
      const newBooking = await Booking.create({
        checkinAt: checkIn,
        checkoutAt: checkOut,
        price: room.price * rentalDays,
        room: room._id,
        user: user._id,
      });
      return res.status(200).json({ status: "success", data: newBooking });
    } catch (error) {
      console.log(error);
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async update(req, res) {}
  async delete(req, res) {}
  // ...
}
module.exports = new BookingController();
