const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/products.controller");

router.get("/", controller.index);

module.exports = router;