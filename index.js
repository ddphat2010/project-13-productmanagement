const express = require ("express");

const app = express ();

const port = 3000;

app.get("/", (req, res)=>{
    res.send("<h1>Trang chủ</h1>");
})
app.get("/products", (req, res)=>{
    res.send("<h1>Trang sản phẩm</h1>");
})

app.listen(port,() =>{
    console.log("App running on Port 3000");
})
