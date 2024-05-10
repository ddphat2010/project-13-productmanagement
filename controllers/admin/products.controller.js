const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus.helper");
const paginationHelper = require("../../helpers/pagination.helper");
// [GET] /admin/products
// module.exports.index = (req, res) => {
//     res.render("./admin/pages/products/index.pug", {
//         pageTitle: "Quản Lí Sản Phẩm"
//     });
// }
module.exports.index = async (req, res) => {
    try {
        // filterStatus
        const filterStatus = filterStatusHelper(req.query);
        // end filterStatus

        const find = {
            deleted: false
        }

        
        if(req.query.status) {
            find.status = req.query.status;
        }

        // Search
        if(req.query.keyword) {
            const keyword = RegExp(req.query.keyword, "i")
            find.title = keyword;
        }
        // End Search


        // Pagination
        const countProducts = await Product.countDocuments(find);
        const objectPagination = paginationHelper(4, req.query, countProducts);
        // End Pagination

        const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);


        res.render("./admin/pages/products/index.pug", {
            pageTitle: "Trang Danh Sách Sản Phẩm",
            products: products,
            filterStatus: filterStatus,
            keyword: req.query.keyword,
            pagination: objectPagination
        });
    } catch (error) {
        console.log(error);
        res.redirect("/admin/products");
    }

}
