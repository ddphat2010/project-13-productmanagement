const homeRouter = require("./home.route");
const productsRouter = require("./products.route");
const searchRoutes = require("./search.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware.js");

module.exports.routesClient = (app) => {
    app.use(categoryMiddleware.category);

    app.use(
        "/",
        homeRouter
    );

    app.use(
        "/products", 
        productsRouter
    );

    app.use(
        "/search", 
        searchRoutes
    );

}