const router = require("express").Router();
const bookmarkController = require("../../controllers/bookmark.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
router.post("/:hotelId", authMiddleware.protect, bookmarkController.create);
router.delete("/:hotelId", authMiddleware.protect, bookmarkController.delete);
module.exports = router;
