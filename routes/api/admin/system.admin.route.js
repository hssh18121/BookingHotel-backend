const systemAdminApi = require("express").Router();
const systemAdminController =
  require("../../../controllers/admin.controller.js").systemAdminController;
const {
  validateIdParams,
} = require("../../../middlewares/validate.middleware");
const hotelController = require("../../../controllers/hotel.controller");
const { isHasPermission } = require("../../../middlewares/auth.middleware");
systemAdminApi.patch(
  "/activate/:hotelAdminId",
  validateIdParams,
  systemAdminController.activateHotelAdmin
);
systemAdminApi.get("/hotel-admins", systemAdminController.getHotelAdmins);
systemAdminApi.route("/hotel").post(hotelController.create);
systemAdminApi
  .route("/hotel/:hotelId")
  .all(validateIdParams, isHasPermission)
  .patch(hotelController.update)
  .delete(hotelController.delete);
module.exports = systemAdminApi;
