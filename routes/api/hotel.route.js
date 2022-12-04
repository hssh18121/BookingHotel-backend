const router = require("express").Router();
const hotelController = require("../../controllers/hotel.controller");
router.get("/all", hotelController.getAll);
router.get("/:id/rooms", hotelController.getRooms);
router.get("/:id", hotelController.getHotel);
module.exports = router;
