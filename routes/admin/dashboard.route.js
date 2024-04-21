const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/dashboard.controller");

router.get("/", controllers.dashboard);

module.exports = router