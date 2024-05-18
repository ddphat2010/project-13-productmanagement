const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/products.controller");

router.get("/", controller.index);

router.get("/:slugCategory", controller.category);

// router.get("/:slug", controller.detail);

module.exports = router;