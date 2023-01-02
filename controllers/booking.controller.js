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
      const isBooked = await Booking.isBooked({ checkIn, checkOut, room });
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
  async update(req, res) {
    return res.status(301).json({
      status: "error",
      message: "Update booking is not supported",
      hint: "Please use delete and create new booking",
    });
  }
  async delete(req, res) {
    const user = req.user;
    try {
      const booking = await Booking.findById(req.params.bookingId);
      if (!booking) {
        return res.status(400).json({
          status: "error",
          message: "Booking not found",
        });
      }
      if (!booking.user.equals(user._id)) {
        return res.status(403).json({
          status: "error",
          message: "You are not authorized to delete this booking",
        });
      }
      await booking.remove();
      return res.status(200).json({
        status: "success",
        message: "Delete booking successfully",
      });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  // ...
  async getAll(req, res) {
    const user = req.user;
    try {
      const room = await Room.findById(req.params.roomId);
      if (!room) {
        return res.status(400).json({
          status: "error",
          message: "Room not found",
        });
      }
      const bookings = await Booking.find({ user: user._id, room: room._id });
      return res.status(200).json({ status: "success", data: bookings });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
  async bookings(req, res) {
    const user = req.user;
    let bookings = req.body.bookings;
    if (!Array.isArray(bookings)) {
      return res.status(400).json({
        status: "error",
        message: "Bookings must be an array",
      });
    }
    try {
      bookings = await Promise.all(
        bookings.map(async ({ room, checkIn, checkOut }) => {
          const validateErr = validateCheckInCheckOut({ checkIn, checkOut });
          if (validateErr) {
            return {
              room,
              status: "error",
              message: validateErr,
            };
          }

          room = await Room.findById(room);
          if (!room) {
            return {
              room,
              status: "error",
              message: "Room not found",
            };
          }
          checkIn = new Date(checkIn);
          checkOut = new Date(checkOut);
          const isBooked = await Booking.isBooked({ checkIn, checkOut, room });
          if (isBooked) {
            return {
              room: room.id,
              status: "error",
              message: "Room is booked",
            };
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
          return newBooking;
        })
      );
      return res.status(200).json({ status: "success", data: bookings });
    } catch (error) {
      return res.status(503).json({
        status: "error",
        message: "Service error. Please try again later",
      });
    }
  }
}
module.exports = new BookingController();
