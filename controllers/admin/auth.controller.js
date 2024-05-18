const Account = require("../../models/account.model");
const md5 = require("md5");
// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    res.render("./admin/pages/auth/login", {
        pageTitle: "Đăng Nhập"
    });
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false
    })

    if(!user) {
        req.flash("error", "email không tồn tại")
        res.redirect("back");

        return;
    }

    if(md5(password) != user.password) {
        req.flash("error", "Sai mật khảu")
        res.redirect("back");

        return;
    }

    if(user.status != "active") {
        req.flash("error", "Tài khoản đang bị khóa");
        res.redirect("back");

        return;
    }

    res.cookie("token", user.token);

    res.redirect("/admin/dashboard");
}

// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect(`/admin/auth/login`);
}