const ProductCategory = require("../../models/products-category.model");
const createTreeHelper = require("../../helpers/createTree.healper");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    });

    res.render("./admin/pages/products-category/index.pug", {
        pageTitle: "Danh mục Sản Phẩm",
        records: records
    });
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    })


    const newRecords = createTreeHelper(records);

    // console.log(records);
    console.log(newRecords);

    // [
    //     {
    //         title : "Điện Thoại",
    //         children : [
    //             {
    //                 title: 'Điện Thoại Samsung'
    //             },{
    //                 title: 'Điện Thoại Iphone'
    //             }
    //         ]
    //     },{
    //         title : 'Thời Trang',
    //         children : [
    //             {
    //                 title: 'Thời Trang nam',
    //                 children: [
    //                     {
    //                         title: 'Áo khoác nam'
    //                     },{
    //                         title: 'Quần dài nam'
    //                     }
    //                 ]
    //             },{
    //                 title: 'Thời Trang nữ'
    //             },{
    //                 title: 'Thời Trang trẻ em'
    //             }
    //         ]
    //     }
    // ]

    res.render("./admin/pages/products-category/create.pug", {
        pageTitle: "Thêm mới Sản Phẩm",
        records: newRecords
    });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position == "") {
        const countRecords = await ProductCategory.countDocuments();
        req.body.position = countRecords + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const records = new ProductCategory(req.body);
    await records.save();

    req.flash("success", "Thêm mới danh mục sản phẩm thành công");
    res.redirect("/admin/products-category");
}

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const data = await ProductCategory.findOne({
            _id: req.params.id,
            deleted: false
        });
    
        const records = await ProductCategory.find({
            deleted: false
        })
    
        const newRecords = createTreeHelper(records); 
    
        console.log(data);
    
        res.render("./admin/pages/products-category/edit.pug", {
            pageTitle: "Chỉnh sửa danh mục",
            data: data,
            records: newRecords
        })
    } catch (error) {
        res.redirect("/admin/products-category");
    }
}

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        if(req.body.position == "") {
            const countRecords = await ProductCategory.countDocuments();
            req.body.position = countRecords + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
    
        await ProductCategory.updateOne({
            _id: req.params.id,
            deleted: false
        },
            req.body    
        )
    
        req.flash("success", "Cập nhật danh mục sản phẩm thành công");
        res.redirect("back")
        
    } catch (error) {
        console.log(error);
        res.redirect("/admin/products-category");
    }
}
