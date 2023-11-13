const express = require("express");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();

router.get("/", AuthController.register);

router.get("/ai", AuthController.login);

module.exports = router;
