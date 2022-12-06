const router = require("express").Router();
const meController = require("../../controllers/me.controller");
const authMiddleware = require("../../middleware/auth.middleware");
router.get("/", authMiddleware.protect, meController.getMe);
module.exports = router;
