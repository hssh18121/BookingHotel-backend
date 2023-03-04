const router = require("express").Router();
const ratingController = require("../../controllers/rating.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
router
  .route("/:hotelId")
  .get(ratingController.getRating)
  .all(authMiddleware.protect)
  .post(ratingController.rate)
  .delete(ratingController.unRate)
  .put(ratingController.updateRating);
module.exports = router;
