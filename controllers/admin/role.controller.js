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

// [GET]/admin/roles/create
module.exports.create = (req, res) => {
    res.render("./admin/pages/roles/create.pug", {
        pageTitle: "Thêm mới nhóm quyền"
    });
}

// [Post]/admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);

    await record.save()
    
    res.redirect("/admin/roles");
}