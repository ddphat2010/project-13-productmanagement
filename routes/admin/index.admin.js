module.exports.routesAdmin = (app) => {
    app.get("/dashboard", (req, res) => {
        res.send("OK");
    })
}