const Role = require("../../models/role.model");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false
    });

    res.render("./admin/pages/roles/index.pug", {
        pageTitle: "Nhóm Quyền",
        records: records
    });
}

// [GET] /admin/roles/create
module.exports.create = (req, res) => {
    res.render("./admin/pages/roles/create.pug", {
        pageTitle: "Thêm mới nhóm quyền"
    });
}

// [Post] /admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);

    await record.save()
    
    res.redirect("/admin/roles");
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const records = await Role.findOne({
            _id: req.params.id,
            deleted: false
        })
    
        res.render("./admin/pages/roles/edit.pug", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            records: records
        });
    } catch (error) {
        console.log(error);
        res.redirect("/admin/roles");
    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        await Role.updateOne({
            _id: req.params.id,
            deleted: false
        },
            req.body
        )
        res.redirect("back");
    } catch (error) {
        console.log(error);
    }

}

// [GET] /permission
module.exports.permission = async (req, res) => {
    const records = await Role.find({
        deleted: false
    })

    res.render("./admin/pages/roles/permission.pug", {
        pageTitle: "Phân quyền",
        records: records
    });
}