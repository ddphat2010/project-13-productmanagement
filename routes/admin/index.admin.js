const routesDashboard = require("./dashboard.route");
const routesProducts = require("./products.route");
const routesProductsCategory = require("./product-category.route");
const routesRoles = require("./role.route");
const routesAccounts = require("./account.route");
const routesAuth = require("./auth.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware");
const routesMyaccount = require("./my-account.route");

module.exports.routesAdmin = (app) => {
    app.use(
        "/admin/dashboard", 
        authMiddleware.requireAuth, 
        routesDashboard
    );

    app.use(
        "/admin/products", 
        authMiddleware.requireAuth, 
        routesProducts
    );

    app.use(
        "/admin/products-category", 
        authMiddleware.requireAuth, 
        routesProductsCategory
    );

    app.use(
        "/admin/roles", 
        authMiddleware.requireAuth, 
        routesRoles
    );

    app.use(
        "/admin/accounts", 
        authMiddleware.requireAuth, 
        routesAccounts
    );

    app.use(
        `/admin/my-account`,
        authMiddleware.requireAuth,
        routesMyaccount
      );
    

    app.use("/admin/auth", routesAuth);

    
}