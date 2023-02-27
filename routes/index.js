const apiRoute = require("./api");
function route(app) {
  app.use("/api", apiRoute);
  app.use("/", (req, res) =>
    res.status(403).send(`${error403HTML}
    `)
  );
}
module.exports = route;
var error403HTML = require("fs").readFileSync(
  require("path").join(__dirname, "../utils/error/403.html"),
  "utf8"
);
