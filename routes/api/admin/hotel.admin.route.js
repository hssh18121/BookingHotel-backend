const hotelAdminRouter = require("express").Router();
const hotelAdminController =
  require("../../../controllers/admin.controller").hotelAdminController;
hotelAdminRouter.get("/kinds", hotelAdminController.getHotelKinds);
hotelAdminRouter.patch("/:hotelId", hotelAdminController.updateHotel);
hotelAdminRouter.patch("/:hotelId/booking", hotelAdminController.updateBooking);

hotelAdminRouter.post(
  "/:hotelId/room",
  mock //hotelAdminController.createRoom
);
hotelAdminRouter.patch(
  "/:hotelId/room",
  mock //hotelAdminController.updateRoom
);
hotelAdminRouter.delete(
  "/:hotelId/room",
  mock //hotelAdminController.deleteRoom
);
hotelAdminRouter.delete(
  "/:hotelId/rating",
  mock //hotelAdminController.deleteRating
);
hotelAdminRouter.get(
  "/:hotelId/statistic",
  mock //hotelAdminController.statistic
);
hotelAdminRouter.get("/", hotelAdminController.getHotels);
module.exports = hotelAdminRouter;

function mock(req, res) {
  res.send("mock");
}
