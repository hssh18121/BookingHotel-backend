const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/users").get(userController.getAllUsers);
router.route("/users/:id").get(userController.getUser);
module.exports = router;
