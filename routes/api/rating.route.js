const router = require("express").Router();
const ratingController = require("../../controllers/rating.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
router.post("/:hotelId", authMiddleware.protect, ratingController.rate);
router.delete("/:hotelId", authMiddleware.protect, ratingController.unRate);
router.put("/:hotelId", authMiddleware.protect, ratingController.updateRating);
module.exports = router;
