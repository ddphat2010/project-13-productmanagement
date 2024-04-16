module.exports.routesClient = (app) => {
    app.get("/", (req, res)=>{
        res.send("<h1>Trang chủ</h1>");
    })
    app.get("/products", (req, res)=>{
        res.send("<h1>Trang sản phẩm</h1>");
    })
}