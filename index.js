const express = require ("express");
const routesClient = require("./routes/client/index.route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL)
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
