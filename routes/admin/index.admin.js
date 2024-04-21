const routesDashboard = require("./dashboard.route");
const routesProducts = require("./products.route");

module.exports.routesAdmin = (app) => {
    app.use("/admin/dashboard", routesDashboard);

    app.use("/admin/products", routesProducts);
}