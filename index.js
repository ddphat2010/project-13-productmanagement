const express = require ("express");
const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.admin");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override")

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected!!!"));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"))

// routesClient
routesClient.routesClient(app);
// end routesClient

// routesAdmin
routesAdmin.routesAdmin(app);
// end routesAdmin


app.listen(port,() =>{
    console.log("App running on Port 3000");
})
