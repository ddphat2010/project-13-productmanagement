const Product = require("../../models/products.model");

// [GET] /admin/products
// module.exports.index = (req, res) => {
//     res.render("./admin/pages/products/index.pug", {
//         pageTitle: "Quản Lí Sản Phẩm"
//     });
// }
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false,
        status: "active"
    })

    for (const item of products) {
        item.priceNew = item.price * (1 - item.discountPercentage/100);
        item.priceNew = item.priceNew.toFixed(0);
    }


    res.render("./admin/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products
    });
}
