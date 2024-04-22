const Product = require("../../models/products.model");

// [GET] /admin/products
module.exports.index = (req, res) => {
    res.render("./admin/pages/products/index.pug", {
        pageTitle: "Quản Lí Sản Phẩm"
    });
}