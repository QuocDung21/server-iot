const express = require("express");
const HouseController = require("../controllers/house.controller");
const router = express.Router();

router.get("/", HouseController.updateHouse);
router.get("/data", HouseController.getHouse);

module.exports = router;
