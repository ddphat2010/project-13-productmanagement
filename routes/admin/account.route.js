const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/account.controller");

const multer  = require('multer');

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");


const upload = multer();

router.get("/", controllers.index);

router.get("/create", controllers.create);

router.post(
    "/create",
    upload.single("avatar"), 
    uploadCloud.uploadSingle,
    controllers.createPost
);

router.get("/edit/:id", controllers.edit);

router.patch(
    "/edit/:id",
    upload.single("avatar"), 
    uploadCloud.uploadSingle,
    controllers.editPatch
);



module.exports = router