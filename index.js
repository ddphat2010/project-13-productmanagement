const express = require ("express");
const routesClient = require("./routes/client/index.route");
const app = express();

const port = 3000;

routesClient.routesClient(app);

app.listen(port,() =>{
    console.log("App running on Port 3000");
})
