const apiRoute = require("./api");
function route(app) {
  app.use("/api", apiRoute);
}
