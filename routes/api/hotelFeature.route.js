const router = require("express").Router();
const hotelFeatureController = require("../../controllers/hotelFeature.controller");
router.get("/all", hotelFeatureController.getAll);

module.exports = router;
