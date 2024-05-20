const homeRouter = require("./home.route");
const productsRouter = require("./products.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route.js");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");
const chatRoutes = require("./chat.route");


const categoryMiddleware = require("../../middlewares/client/category.middleware.js");

const userMiddleware = require("../../middlewares/client/user.middleware");

const cartMiddleware = require("../../middlewares/client/cart.middleware.js");

const settingMiddleware = require("../../middlewares/client/setting.middleware.js")

const authMiddleware = require("../../middlewares/client/auth.middleware");

module.exports.routesClient = (app) => {
    app.use(categoryMiddleware.category);

    app.use(cartMiddleware.cart);

    app.use(userMiddleware.infoUser);

    app.use(settingMiddleware.settingsGeneral);

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

    app.use(
        "/user", 
        userRoutes
    );

    app.use("/chat",authMiddleware.requireAuth, chatRoutes);

}