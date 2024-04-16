const homeRouter = require("./home.route");

module.exports.routesClient = (app) => {
    app.get("/", homeRouter);
    
    app.get("/products", (req, res)=>{
        res.send("<h1>Trang sản phẩm</h1>");
    })
}