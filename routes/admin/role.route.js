const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/role.controller");

router.get("/", controllers.index);

router.get("/create", controllers.create);

router.post("/create", controllers.createPost);

router.get("/edit/:id", controllers.edit);

router.patch("/edit/:id", controllers.editPatch);


module.exports = router