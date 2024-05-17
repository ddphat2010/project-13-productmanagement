const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/account.controller");

router.get("/", controllers.index);

module.exports = router