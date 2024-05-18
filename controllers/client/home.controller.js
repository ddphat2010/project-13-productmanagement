const Product = require("../../models/products.model");

// [GET] /
module.exports.index = async (req, res) => { 
    const productsFeatured = await Product.find({
        featured: "1",
        status: "active",
        deleted: false
    }).sort({ position: "desc" }).limit(6);

    for (const item of productsFeatured) {
        item.priceNew = item.price * (100 - item.discountPercentage)/100
    }

    console.log(productsFeatured);

    res.render("./client/pages/home/index.pug", {
        pageTitle: "Trang Chủ",
        productsFeatured: productsFeatured
    });
}