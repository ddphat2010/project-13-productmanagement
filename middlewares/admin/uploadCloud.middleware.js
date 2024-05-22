const uploadToCloudinary = require("../../helpers/uploadToCloudinary.helper");

module.exports.uploadSingle = async (req, res, next) => {
    if(req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      req.body[req.file.fieldname] = result.url
      next();
    } else {
      next();
    }

}