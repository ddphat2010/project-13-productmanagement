const homeRouter = require("./home.route");
const productsRouter = require("./products.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route.js");
const checkoutRoutes = require("./checkout.route");


const categoryMiddleware = require("../../middlewares/client/category.middleware.js");

const cartMiddleware = require("../../middlewares/client/cart.middleware.js");

module.exports.routesClient = (app) => {
    app.use(categoryMiddleware.category);

    app.use(cartMiddleware.cart);

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

    app.use(
        "/cart", 
        cartRoutes
    );
    
    app.use(
        "/checkout", 
        checkoutRoutes
    );


}