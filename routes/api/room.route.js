const router = require("express").Router();
const roomController = require("../../controllers/room.controller");
router.get("/all", roomController.getAll);
router.get("/:id", roomController.getRoom);
module.exports = router;
