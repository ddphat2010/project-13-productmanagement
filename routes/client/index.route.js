const homeRouter = require("./home.route");
const productsRouter = require("./products.route");

module.exports.routesClient = (app) => {
    app.use("/", homeRouter);

    app.use("/products", productsRouter);
}