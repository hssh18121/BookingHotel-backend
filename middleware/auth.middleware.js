const jwt = require("jsonwebtoken");
const User = require("../models").User;
class Authorization {
  protect(req = new Request(), res = new Response(), next) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ status: "error", message: "Authorization failed" });
    }
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { id: decoded.id };
    next();
  }
}
module.exports = new Authorization();
