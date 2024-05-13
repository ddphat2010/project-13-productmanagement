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

        const products = await Product.find(find)
        .sort({
            position: "desc"
        })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);


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

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = (req.params.status);
    const id = (req.params.id);

    await Product.updateOne({
        _id: id
    }, {
        status: status
    })

    req.flash('success', 'Cập nhật trạng thái thành công!!!');
    res.redirect("back");
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    switch (type) {
        case "active":
        case "inactive":
            await Product.updateMany({
                _id: {$in: ids}
            }, {
                status: type
            })
            req.flash("success", "Cập nhật trạng thái thành công!!!");
            break; 
        case "delete-all":
            await Product.updateMany({
                _id: {$in: ids}
            }, {
                deleted: true,
                deletedAt: new Date()
            })
            req.flash("success", "Xóa tất cả sản phẩm thành công!!!");
            break;  
        case "change-position":
            for (const item of ids) {
                let [id, position] = (item.split("-"))
                position = parseInt(position);

                await Product.updateOne({
                    _id: id
                }, {
                    position:position
                })
            }
            req.flash("success", "Thay đổi vị trí thành công!!!");
            break;
        default:
            break;
    }
    res.redirect("back");
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id

        // await Product.deleteOne({
        //     _id: id
        // })
    
        await Product.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date()
        })
        req.flash("success", "Xóa sản phẩm thành công!!!");
    } catch (error) {
        console.log(error);
    }

    res.redirect("back");  

}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("./admin/pages/products/create.pug", {
        pageTitle: "Thêm mới sản phẩm"
    });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);

    if(req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    console.log(req.file);
    console.log(req.body);

    // if(req.file && req.file.filename) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`
    // }


    const product = new Product(req.body);
    await product.save();

    req.flash("success", "Thêm mới sản phẩm thành công");
    res.redirect("/admin/products");
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
    
        const product = await Product.findOne({
            _id: id,
            deleted: false
        });
    
        console.log(product);
    
    
        res.render("./admin/pages/products/edit.pug", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    } catch (error) {
        res.redirect("/admin/products");
    }
}


// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;

        req.body.price = parseInt(req.body.price);
        req.body.stock = parseInt(req.body.stock);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.position = parseInt(req.body.position);

        console.log(req.file);
        if(req.file && req.file.filename) {
            req.body.thumbnail = `/uploads/${req.file.filename}`
        }

        await Product.updateOne({
            _id: id,
            deleted: false
            }, 
            req.body
        );

        req.flash("success", "Cập nhật sản phẩm thành công");
        res.redirect("back");
    } catch (error) {
        res.redirect("/admin/products");
    }

}

//  [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id
    
        const product = await Product.findOne({
            _id: id,
            deleted: false
        });
    
        console.log(product);
    
    
        res.render("./admin/pages/products/detail.pug", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });
    } catch (error) {
        res.redirect("/admin/products");
    }
}