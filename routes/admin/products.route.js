const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products.controller");

router.get("/", controllers.index);

module.exports = router