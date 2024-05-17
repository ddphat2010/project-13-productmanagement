const Account = require("../../models/account.model");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    // find
    let find = {
        deleted: false,
    }
    // End find

    const records = await Account.find(find);

    res.render("./admin/pages/account/index", {
        pageTitle: "Danh sách tài khoản",
        records: records
    })
}