const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products.controller");
const multer  = require('multer');
const validate = require("../../validates/admin/product.validate");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// const storageMulter = require("../../helpers/storageMulter.helper");

// const upload = multer({ storage: storageMulter() });

// cloudinary
cloudinary.config({ 
    cloud_name: "df36bt1xr", 
    api_key: "899446338953232", 
    api_secret: "vOaUaehG8wQYCY2n9feikylnpJQ"
});
// End cloudinary

const upload = multer();

router.get("/", controllers.index);

router.patch("/change-status/:status/:id", controllers.changeStatus);

router.patch("/change-multi", controllers.changeMulti);

router.delete("/delete/:id", controllers.deleteItem);

router.get("/create/", controllers.create);

router.post("/create/", 
upload.single('thumbnail'), 
function (req, res, next) {
    if(req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.url
            next();
        }
    
        upload(req);
    } else {
        next();
    }

},
validate.createPost,
controllers.createPost);

router.get("/edit/:id", controllers.edit);

router.patch("/edit/:id", 
upload.single('thumbnail'), 
function (req, res, next) {
    if(req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.url
            next();
        }
    
        upload(req);
    } else {
        next();
    }

},
validate.createPost,
controllers.editPatch);

router.get("/detail/:id", controllers.detail);


module.exports = router;