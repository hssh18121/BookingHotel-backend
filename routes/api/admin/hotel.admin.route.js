const hotelAdminRouter = require("express").Router();
const hotelAdminController =
  require("../../../controllers/admin.controller").hotelAdminController;
hotelAdminRouter.get("/bookings", hotelAdminController.getBookings);
hotelAdminRouter.get("/hotel/kinds", hotelAdminController.getHotelKinds);
hotelAdminRouter.patch("/hotel/:hotelId", hotelAdminController.updateHotel);
module.exports = hotelAdminRouter;
