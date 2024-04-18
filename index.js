const express = require ("express");
const routesClient = require("./routes/client/index.route");
const app = express();

const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

// routesClient
routesClient.routesClient(app);
// end routesClient


app.listen(port,() =>{
    console.log("App running on Port 3000");
})
