const express = require("express");
const testController = require("../controllers/testController");
const router = express.Router();

router.route("/test").get(testController.getAllTestData);

module.exports = router;
