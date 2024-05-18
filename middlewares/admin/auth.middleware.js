const Account = require("../../models/account.model");

module.exports.requireAuth = async (req, res, next) => {
    console.log(req.cookies.token);
    if(!req.cookies.token) {
        res.redirect("/admin/auth/login");
    } 

    try {
        const user = await Account.findOne({
            token: req.cookies.token,
            deleted: false,
            status: "active"
        })

        if(!user) {
            res.redirect("/admin/auth/login");
        } 
        next();
    } catch (error) {
        res.redirect("/admin/auth/login");
    }
};