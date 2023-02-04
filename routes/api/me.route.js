const router = require("express").Router();
const meController = require("../../controllers/me.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
router.get("/", authMiddleware.protect, meController.getMe);
router.put("/password", authMiddleware.protect, meController.changePassword);
router.put("/profile", authMiddleware.protect, meController.updateProfile);
router.put("/avatar", authMiddleware.protect, meController.updateAvatar);

module.exports = router;
