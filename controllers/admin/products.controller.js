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

    // Search
    if(req.query.keyword) {
        const keyword = RegExp(req.query.keyword, "i")
        find.title = keyword;
    }
    // End Search


    // Pagination
    const objectPagination = {
        limitItem : 4,
        currentPage : 1

    };

    if(req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;

    const countProducts = await Product.countDocuments(find);
    objectPagination.totalPage = Math.ceil(countProducts/objectPagination.limitItem)

    console.log(objectPagination);
    // End Pagination

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);


    res.render("./admin/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: req.query.keyword,
        pagination: objectPagination
    });
}
