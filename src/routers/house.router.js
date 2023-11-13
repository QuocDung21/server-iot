const express = require("express");
const HouseController = require("../controllers/house.controller");
const House = require("../models/house.model");

const router = express.Router();

router.get("/", HouseController.updateHouse);
router.get("/data", HouseController.getHouse);

router.get("/test", (req, res) => {
    House.findOneAndUpdate({name: "house_data"}, {
        test: "123"
    })
})

module.exports = router;
