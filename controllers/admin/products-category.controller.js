const ProductCategory = require("../../models/products-category.model");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    res.render("./admin/pages/products-category/index.pug", {
        pageTitle: "Danh mục Sản Phẩm"
    });
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    res.render("./admin/pages/products-category/create.pug", {
        pageTitle: "Thêm mới Sản Phẩm"
    });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position == "") {
        const countRecords = await ProductCategory.countDocuments();
        req.body.position = countRecords + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const records = new ProductCategory(req.body);
    await records.save();

    req.flash("success", "Thêm mới danh mục sản phẩm thành công");
    res.redirect("/admin/products-category");
}