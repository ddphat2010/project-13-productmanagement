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

    for (const record of records) {
        const role = await Roles.findOne({
            _id: record.role_id
        })
        record.role = role

    }

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

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  const find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const data = await Account.findOne(find);

    const roles = await Roles.find({
      deleted: false,
    });

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`/admin/accounts`);
  }
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    if(req.body.password) {
        req.body.password = md5(req.body.password); 
    } else {
        delete req.body.password
    }

    await Account.updateOne({
        _id: id
    },
        req.body        
    )

    console.log(id)
    console.log(req.body);

    res.redirect("back");
  };