const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products.controller");

router.get("/", controllers.index);

router.patch("/change-status/:status/:id", controllers.changeStatus);

router.patch("/change-multi", controllers.changeMulti);

router.delete("/delete/:id", controllers.deleteItem);

module.exports = router;