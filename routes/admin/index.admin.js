const routesDashboard = require("./dashboard.route");
const routesProducts = require("./products.route");
const routesProductsCategory = require("./product-category.route");

module.exports.routesAdmin = (app) => {
    app.use("/admin/dashboard", routesDashboard);

    app.use("/admin/products", routesProducts);

    app.use("/admin/products-category", routesProductsCategory);
}