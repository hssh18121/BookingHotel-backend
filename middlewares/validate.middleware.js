const { isValid } = require("mongoose").Types.ObjectId;

module.exports = {
  validateIdParams: (req, res, next) => {
    for (const iterator of Object.entries(req.params)) {
      const [key, value] = iterator;
      if (!isValid(value)) {
        return res.status(400).json({
          status: "error",
          message: `Invalid ${key} with value ${value}`,
        });
      }
    }
    next();
  },
};
