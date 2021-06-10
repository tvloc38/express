var userModel = require("../models/user.model");
const cloudinary = require("cloudinary").v2;
const bcrypt = require('bcrypt');

cloudinary.config({
  cloud_name: "tvlocus6789",
  api_key: "574176583157511",
  api_secret: "9no-5cr1ppnKI9IPOEsjQ23t42Q",
});

module.exports.postLogin = function(req, res) {
  userModel.findOne({email: req.body.email}, function(err, user){
    if (!user) {
      res.render('auth/login',{
        alert: "Wrong email!",
        values: req.body
      })
    } else {
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if (!result) {
          res.render('auth/login',{
            alert: "Wrong password",
            values: req.body
          })
        } else {
          res.cookie("userId", user.id, {
            signed: true
          })
          res.redirect('/')
        }
      })
    }
  })
}

module.exports.postSignup = function (req, res) {
  cloudinary.uploader.upload(req.file.path, function(error, result) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      var user = new userModel({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        avatar: result.url,
        password: hash,
        isAdmin: false
      })
      user.save()
      .then(function(){
        res.redirect('/auth/login');
        return;
      })
      .catch(function(){
        res.render('./auth/signup');
        return;
      })
    });
  });  
}