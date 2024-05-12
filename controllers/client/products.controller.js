const Product = require("../../models/products.model");

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false,
        status: "active"
    }).sort({
        position: "desc"
    });

    for (const item of products) {
        item.priceNew = item.price * (1 - item.discountPercentage/100);
        item.priceNew = item.priceNew.toFixed(0);
    }


    res.render("./client/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products
    });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;

        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        });
    
        console.log(product);
    
        console.log(slug);
    
        res.render("./client/pages/products/detail.pug", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect("/");
    }
}