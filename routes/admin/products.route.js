const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products.controller");

router.get("/", controllers.index);

router.patch("/change-status/:status/:id", controllers.changeStatus);

module.exports = router;