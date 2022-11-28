const express = require("express");
const hotelController = require("../controllers/hotelController");
const router = express.Router();

router.route("/hotels").get(hotelController.getAllHotels);
router.route("/hotels/:id").get(hotelController.getHotel);
router.route("/hotels/:id").delete(hotelController.deleteHotel);

module.exports = router;
