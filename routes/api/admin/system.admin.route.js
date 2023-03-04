const systemAdminApi = require("express").Router();
const systemAdminController =
  require("../../../controllers/admin.controller.js").systemAdminController;
const {
  validateIdParams,
} = require("../../../middlewares/validate.middleware");
systemAdminApi.patch(
  "/activate/:hotelAdminId",
  validateIdParams,
  systemAdminController.activateHotelAdmin
);
systemAdminApi.get("/hotel-admins", systemAdminController.getHotelAdmins);
module.exports = systemAdminApi;
