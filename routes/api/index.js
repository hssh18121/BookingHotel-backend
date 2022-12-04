const apiRoute = require("express").Router();
const authRoute = require("./auth.route");
const hotelRoute = require("./hotel.route");
apiRoute.use("/auth", authRoute);
apiRoute.use("/hotel", hotelRoute);
module.exports = apiRoute;
