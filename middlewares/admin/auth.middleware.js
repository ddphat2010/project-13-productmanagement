const Account = require("../../models/account.model");
const Roles = require("../../models/role.model");

module.exports.requireAuth = async (req, res, next) => {
    if(!req.cookies.token) {
        res.redirect("/admin/auth/login");
    } 

    try {
        const user = await Account.findOne({
            token: req.cookies.token,
            deleted: false,
            status: "active"
        }).select("-password")

        if(!user) {
            res.redirect("/admin/auth/login");
        }

        const role = await Roles.findOne({
            _id: user.role_id,
            deleted: false
        })

        res.locals.user = user
        res.locals.role = role
        next();
    } catch (error) {
        console.log(error);
    }
};