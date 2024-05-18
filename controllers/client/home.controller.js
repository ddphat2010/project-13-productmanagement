const Product = require("../../models/products.model");

// [GET] /
module.exports.index = async (req, res) => { 
    // Feature
    const productsFeatured = await Product.find({
        featured: "1",
        status: "active",
        deleted: false
    }).sort({ position: "desc" }).limit(6);

    for (const item of productsFeatured) {
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0)
    }

    // End Feature

    // Latest
    const productsNew = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" }).limit(6);

    for (const item of productsNew) {
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0)
    }
    // End Latest

    res.render("./client/pages/home/index.pug", {
        pageTitle: "Trang Chủ",
        productsFeatured: productsFeatured,
        productsNew: productsNew
    });
}
