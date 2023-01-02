const router = require("express").Router();
const bookingController = require("../../controllers/booking.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
router.get("/:roomId", authMiddleware.protect, bookingController.getAll);
router.post("/:roomId", authMiddleware.protect, bookingController.booking);
router.put("/:roomId", authMiddleware.protect, bookingController.update);
router.delete("/:bookingId", authMiddleware.protect, bookingController.delete);
router.post("/", authMiddleware.protect, bookingController.bookings);
module.exports = router;
