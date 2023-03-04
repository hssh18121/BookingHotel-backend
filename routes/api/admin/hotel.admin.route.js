const hotelAdminRouter = require("express").Router();
const {
  validateIdParams,
} = require("../../../middlewares/validate.middleware");
const authMiddleware = require("../../../middlewares/auth.middleware");
const hotelAdminController =
  require("../../../controllers/admin.controller").hotelAdminController;
const roomController = require("../../../controllers/room.controller");
const ratingController = require("../../../controllers/rating.controller");
const hotelController = require("../../../controllers/hotel.controller");
const bookingController = require("../../../controllers/booking.controller");
hotelAdminRouter.patch("/:hotelId", validateIdParams, hotelController.update);

hotelAdminRouter.patch(
  "/:hotelId/booking",
  validateIdParams,
  bookingController.updateStatus
);

hotelAdminRouter
  .route("/:hotelId/room")
  .all(validateIdParams, authMiddleware.isHasPermission)
  .post(roomController.createRoom);

hotelAdminRouter
  .route("/:hotelId/room/:roomId")
  .all(validateIdParams, authMiddleware.isHasPermission)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

hotelAdminRouter
  .route("/:hotelId/rating/:ratingId")
  .all(validateIdParams, authMiddleware.isHasPermission)
  .delete(ratingController.delete);

hotelAdminRouter.get(
  "/:hotelId/statistic",
  validateIdParams,
  mock //hotelAdminController.statistic
);
hotelAdminRouter.get("/", hotelAdminController.getHotels);
module.exports = hotelAdminRouter;

function mock(req, res) {
  res.send("mock");
}
