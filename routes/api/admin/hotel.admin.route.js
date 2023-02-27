const hotelAdminRouter = require("express").Router();
const hotelAdminController =
  require("../../../controllers/admin.controller").hotelAdminController;
hotelAdminRouter.get("/kinds", hotelAdminController.getHotelKinds);
hotelAdminRouter.patch("/:hotelId", hotelAdminController.updateHotel);
hotelAdminRouter.patch("/:hotelId/booking", hotelAdminController.bookingManage); //Booking management
hotelAdminRouter.get("/", hotelAdminController.getHotels);
module.exports = hotelAdminRouter;
