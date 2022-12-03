const apiRoute = require("express").Router();
const authRoute = require("./auth.route");
apiRoute.use("/auth", authRoute);
module.exports = apiRoute;
