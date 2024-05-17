const routesDashboard = require("./dashboard.route");
const routesProducts = require("./products.route");
const routesProductsCategory = require("./product-category.route");
const routesRoles = require("./role.route");
const routesAccounts = require("./account.route");

module.exports.routesAdmin = (app) => {
    app.use("/admin/dashboard", routesDashboard);

    app.use("/admin/products", routesProducts);

    app.use("/admin/products-category", routesProductsCategory);

    app.use("/admin/roles", routesRoles);

    app.use("/admin/accounts", routesAccounts);
}