require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
var port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();

var authRoute = require("./routes/auth.route")
var adminRoute = require("./routes/admin.route")
var booksRoute = require("./routes/book.route")
var booksApiRoute = require("./api/routes/book.route")


var authMiddleware = require("./middlewares/auth.middleware");
var adminMiddleware = require("./middlewares/admin.middleware");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('123123'));
app.use(express.static("public"));

app.get("/", authMiddleware.authRequire, function(req, res){
    res.render('index');
})

app.use("/auth", authRoute)
app.use("/admin", authMiddleware.authRequire, adminMiddleware.isAdmin, adminRoute)
app.use("/books", booksRoute)
app.use("/api/books", booksApiRoute)

app.listen(port, function(){
    console.log("Server listening on port " + port);
})