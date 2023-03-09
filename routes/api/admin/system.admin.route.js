const systemAdminApi = require("express").Router();
const systemAdminController =
  require("../../../controllers/admin.controller.js").systemAdminController;
const {
  validateIdParams,
} = require("../../../middlewares/validate.middleware");
const hotelController = require("../../../controllers/hotel.controller");
const { isHasPermission } = require("../../../middlewares/auth.middleware");
const ratingController = require("../../../controllers/rating.controller");

systemAdminApi.get("/hotel-admins", systemAdminController.getHotelAdmins);
systemAdminApi.route("/hotel").post(hotelController.create);
systemAdminApi
  .route("/hotel/:hotelId")
  .all(validateIdParams, isHasPermission)
  .patch(hotelController.update)
  .delete(hotelController.delete);

systemAdminApi.patch(
  "/activate/:id",
  validateIdParams,
  systemAdminController.activate
);
systemAdminApi.patch(
  "/block/:id",
  validateIdParams,
  systemAdminController.block
);

systemAdminApi.get("/ratings", ratingController.getRatings);
systemAdminApi.delete(
  "/rating/:ratingId",
  validateIdParams,
  ratingController.delete
);

systemAdminApi.patch(
  "/manager/:managerId",
  validateIdParams,
  systemAdminController.updateManager
);
systemAdminApi.get("/statistics", systemAdminController.getStatistics);
systemAdminApi.get("/users", systemAdminController.getUsers);
systemAdminApi.get("/bookings", systemAdminController.getBookings);
systemAdminApi.patch("/manager", systemAdminController.removeManager);
module.exports = systemAdminApi;
