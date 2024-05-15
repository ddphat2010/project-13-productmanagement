const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/role.controller");

router.get("/", controllers.index);

router.get("/create", controllers.create);

router.post("/create", controllers.createPost);

module.exports = router