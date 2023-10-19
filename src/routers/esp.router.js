const express = require("express");
const AuthController = require("../controllers/auth.controller");
const EspController = require("../controllers/esp.controller");
const router = express.Router();

router.get("/", EspController.getEsp);

router.get("/ai", EspController.checkRain);

module.exports = router;
