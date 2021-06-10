var express = require("express");
var router = express.Router();
var multer  = require('multer');
const upload = multer({ dest: "./public/uploads/avatar/" });


var controller = require('../controllers/auth.controller');

router.get("/login", function(req, res){
  res.render('auth/login')
})

router.get("/signup", function(req, res){
  res.render('auth/signup')
})

router.post("/login", controller.postLogin)
router.post("/signup", upload.single("avatar"), controller.postSignup)

module.exports = router

