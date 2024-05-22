const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");


// cloudinary
cloudinary.config({ 
    cloud_name: "df36bt1xr", 
    api_key: "899446338953232", 
    api_secret: "vOaUaehG8wQYCY2n9feikylnpJQ"
});
// End cloudinary

let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
  
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };
  
  module.exports = async (buffer) => {
    let result = await streamUpload(buffer);
    return result.url;
  }