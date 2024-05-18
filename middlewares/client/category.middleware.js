const createTreeHelper = require("../../helpers/createTree.healper");
const ProductCategory = require("../../models/products-category.model");

module.exports.category = async (req, res, next) => {
    const categoryProducts = await ProductCategory.find({
        deleted: false
    })

    const newCategoryProducts = createTreeHelper(categoryProducts);

    console.log(newCategoryProducts);

    res.locals.layoutCategoryProducts = newCategoryProducts;

    next();
}