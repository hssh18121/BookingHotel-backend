const router = require("express").Router();
const authController = require("../../controllers/auth.controller");
const isActivated = require("../../middlewares/auth.middleware").isActivated;
router.post("/login", authController.login, isActivated);
router.post("/signup", authController.signup);
module.exports = router;
