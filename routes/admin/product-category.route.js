const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products-category.controller");

const multer  = require('multer');
const validate = require("../../validates/admin/products-category.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();



router.get("/", controllers.index);


router.get("/create", controllers.create);

router.post(
    "/create", 
    upload.single('thumbnail'), 
    uploadCloud.uploadSingle,
    validate.createPost,
    controllers.createPost
);

module.exports = router;