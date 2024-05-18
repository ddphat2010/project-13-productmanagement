const Product = require("../../models/products.model");
const ProductCategory = require("../../models/products-category.model");
const { all } = require("../../routes/client/products.route");

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

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    const slugCategory = req.params.slugCategory;

    const category = await ProductCategory.findOne({
        slug: slugCategory,
        status: "active",
        deleted: false
    });


    const getsubCategory = async (parentId) => {
        const subs = await ProductCategory.find({
            parent_id: parentId,
            status: "active",
            deleted: false
        });

        let allSubs = [...subs];

        for(const sub of subs) {
            const childs = await getsubCategory(sub.id);    
            allSubs = allSubs.concat(childs);
        }

        return allSubs;

    }

    const allCategory = await getsubCategory(category.id);

    const allCategoryId = allCategory.map(item => item.id);

    console.log(allCategoryId);

    const products = await Product.find({    
        product_category_id: { $in: [
            category.id, 
            ...allCategoryId
        ] },
        status: "active",
        deleted: false
    }).sort({ position: "desc" })

    for (const item of products) {
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0)
    }

    res.render("./client/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products
    });
}
