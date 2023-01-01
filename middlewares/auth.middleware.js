const jwt = require("jsonwebtoken");
const User = require("../models").User;
class Authorization {
  async protect(req = new Request(), res = new Response(), next) {
    const auth = req.headers.authorization;

    if (!auth?.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ status: "error", message: "Authorization failed" });
    }
    const token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res
          .status(401)
          .json({ status: "error", message: "User does not exist" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ status: "error", message: "Token expired" });
      }
    }
  }
}
module.exports = new Authorization();
