const express = require ("express");
const routesClient = require("./routes/client/index.route");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://mnrealest161:qRXdr8uNSZBSrRuh@project-be.1obtg7e.mongodb.net/project-group13-product-management")
    .then(() => console.log("Connected!!!"));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"))

// routesClient
routesClient.routesClient(app);
// end routesClient


app.listen(port,() =>{
    console.log("App running on Port 3000");
})
