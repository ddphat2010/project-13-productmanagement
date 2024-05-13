const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products.controller");
const multer  = require('multer');
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");


// const storageMulter = require("../../helpers/storageMulter.helper");

// const upload = multer({ storage: storageMulter() });


const upload = multer();

router.get("/", controllers.index);

router.patch("/change-status/:status/:id", controllers.changeStatus);

router.patch("/change-multi", controllers.changeMulti);

router.delete("/delete/:id", controllers.deleteItem);

router.get("/create/", controllers.create);

router.post("/create/", 
upload.single('thumbnail'), 
uploadCloud.uploadSingle,
validate.createPost,
controllers.createPost);

router.get("/edit/:id", controllers.edit);

router.patch("/edit/:id", 
upload.single('thumbnail'), 
uploadCloud.uploadSingle,
validate.createPost,
controllers.editPatch);

router.get("/detail/:id", controllers.detail);


module.exports = router;