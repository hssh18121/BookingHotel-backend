const adminApi = require("express").Router();
const hotel = require("./hotel.admin.route");
const system = require("./system.admin.route");
const authMiddleware = require("../../../middlewares/auth.middleware");

adminApi.use(
  "/hotel",
  authMiddleware.protect,
  authMiddleware.isHotelAdmin,
  hotel
);
adminApi.use("/system", authMiddleware.protect, authMiddleware.isAdmin, system);
module.exports = adminApi;
