require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
var port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();

var authRoute = require("./routes/auth.route")

var authMiddleware = require("./middlewares/auth.middleware");

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

app.listen(port, function(){
    console.log("Server listening on port " + port);
})