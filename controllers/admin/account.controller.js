const md5 = require("md5");
const Account = require("../../models/account.model");
const Roles = require("../../models/role.model");

const generateHelper = require("../../helpers/generate.Helper");



// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    // find
    let find = {
        deleted: false,
    }
    // End find

    const records = await Account.find(find);

    res.render("./admin/pages/accounts/index.pug", {
        pageTitle: "Danh sách tài khoản",
        records: records
    })
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Roles.find({
        deleted: false
    })

    console.log(roles);
    res.render("./admin/pages/accounts/create.pug", {
        pageTitle: "Danh sách tài khoản",
        roles: roles
    })
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    req.body.token = generateHelper.generateRandomString(30);

    req.body.password = md5(req.body.password)

    const record = new Account(req.body);

    await record.save();

    res.redirect("/admin/accounts");
}
