// [GET] /products
module.exports.index = (req, res) => {
    res.render("./client/pages/products/index.pug");
}