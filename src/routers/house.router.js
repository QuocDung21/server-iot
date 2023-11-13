const express = require("express");
const HouseController = require("../controllers/house.controller");
const House = require("../models/house.model");

const router = express.Router();

router.get("/", HouseController.updateHouse);
router.get("/data", HouseController.getHouse);

router.get("/esp", HouseController.updateEsp);

module.exports = router;
