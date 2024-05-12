const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products.controller");
const multer  = require('multer');
const validate = require("../../validates/admin/product.validate");

const storageMulter = require("../../helpers/storageMulter.helper");

const upload = multer({ storage: storageMulter() });

router.get("/", controllers.index);

router.patch("/change-status/:status/:id", controllers.changeStatus);

router.patch("/change-multi", controllers.changeMulti);

router.delete("/delete/:id", controllers.deleteItem);

router.get("/create/", controllers.create);

router.post("/create/", 
upload.single('thumbnail'), 
validate.createPost,
controllers.createPost);

router.get("/edit/:id", controllers.edit);

router.patch("/edit/:id", 
upload.single('thumbnail'), 
validate.createPost,
controllers.editPatch);



module.exports = router;