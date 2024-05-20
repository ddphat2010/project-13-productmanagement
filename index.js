const express = require ("express");
const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.admin");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override")
const bodyParser = require("body-parser");
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const path = require("path");
const moment = require("moment");
const http = require('http');

const { Server } = require("socket.io");



dotenv.config()

const app = express();
const port = process.env.PORT;

// socket.io
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Kết nối thành công !", socket.id);
})
// End socket.io

// flash
app.use(cookieParser('MINHNHAT'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End flash

// parser application/x-www-form-urlencode
app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride("_method"));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected!!!"));

app.set("views", `${__dirname}/views`);
// app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));
// app.use(express.static("public"))

// New Route to the TinyMCE Node module
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// App.local.variables
app.locals.moment = moment


// routesClient
routesClient.routesClient(app);
// end routesClient

// routesAdmin
routesAdmin.routesAdmin(app);
// end routesAdmin

// 404 Not Found
app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
      pageTitle: "404 Not Found",
    });
    // res.redirect("/");
  });


server.listen(port,() =>{
    console.log("App running on Port 3000");
})
