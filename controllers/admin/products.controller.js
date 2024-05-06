const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus.helper");
// [GET] /admin/products
// module.exports.index = (req, res) => {
//     res.render("./admin/pages/products/index.pug", {
//         pageTitle: "Quản Lí Sản Phẩm"
//     });
// }
module.exports.index = async (req, res) => {
    // filterStatus
    const filterStatus = filterStatusHelper(req.query);
    // end filterStatus

    const find = {
        deleted: false
    }

    
    if(req.query.status) {
        find.status = req.query.status;
    }

    if(req.query.keyword) {
        const keyword = RegExp(req.query.keyword, "i")
        find.title = keyword;
    }


    const products = await Product.find(find);


    res.render("./admin/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: req.query.keyword
    });
}
