const router = require("express").Router();
const meController = require("../../controllers/me.controller");
const authMiddleware = require("../../middleware/auth.middleware");
router.get("/", authMiddleware.protect, meController.getMe);
router.put("/password", authMiddleware.protect, meController.changePassword);
router.put("/profile", authMiddleware.protect, meController.updateProfile);
module.exports = router;
