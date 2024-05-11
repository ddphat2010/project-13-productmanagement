const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products.controller");
const multer  = require('multer');

const storageMulter = require("../../helpers/storageMulter.helper");

const upload = multer({ storage: storageMulter() });

router.get("/", controllers.index);

router.patch("/change-status/:status/:id", controllers.changeStatus);

router.patch("/change-multi", controllers.changeMulti);

router.delete("/delete/:id", controllers.deleteItem);

router.get("/create/", controllers.create);

router.post("/create/", 
upload.single('thumbnail'), 
controllers.createPost);



module.exports = router;