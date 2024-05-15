const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/role.controller");

router.get("/", controllers.index);

module.exports = router