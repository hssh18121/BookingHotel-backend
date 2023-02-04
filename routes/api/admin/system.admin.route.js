const systemAdminApi = require("express").Router();
const systemAdminController =
  require("../../../controllers/admin.controller.js").systemAdminController;
systemAdminApi.patch(
  "/activate/:hotelAdminId",
  systemAdminController.activateHotelAdmin
);
systemAdminApi.get("/hotel-admins", systemAdminController.getHotelAdmins);
module.exports = systemAdminApi;
