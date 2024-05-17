const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/auth.controller");

router.get("/login", controllers.login);

router.post("/login", controllers.loginPost);

module.exports = router