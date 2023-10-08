const express = require("express");
const AuthController = require("../controllers/auth.controller");
const EspController = require("../controllers/esp.controller");
const router = express.Router();

router.get("/", EspController.getEsp);

module.exports = router;