const apiRoute = require("express").Router();
const authRoute = require("./auth.route");
const hotelRoute = require("./hotel.route");
const meRoute = require("./me.route");
apiRoute.use("/auth", authRoute);
apiRoute.use("/hotel", hotelRoute);
apiRoute.use("/me", meRoute);
module.exports = apiRoute;
