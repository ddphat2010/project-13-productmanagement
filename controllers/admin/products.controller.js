const Product = require("../../models/products.model");

// [GET] /admin/products
// module.exports.index = (req, res) => {
//     res.render("./admin/pages/products/index.pug", {
//         pageTitle: "Quản Lí Sản Phẩm"
//     });
// }
module.exports.index = async (req, res) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status) 
        filterStatus[index].class = "active"
    } else {
        filterStatus[0].class = "active"
    }

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
