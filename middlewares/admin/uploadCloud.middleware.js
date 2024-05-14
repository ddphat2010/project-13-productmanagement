const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");


// cloudinary
cloudinary.config({ 
    cloud_name: "df36bt1xr", 
    api_key: "899446338953232", 
    api_secret: "vOaUaehG8wQYCY2n9feikylnpJQ"
});
// End cloudinary

module.exports.uploadSingle = (req, res, next) => {
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

}