var User = require("../models/user.model")
// var User = Model.UserModel

module.exports.authRequire = function(req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }
  User.findById(req.signedCookies.userId, function(err, user){
    if (!user) {
      res.redirect("/auth/login");
      return;
    }
    res.locals.user = user;
    next();
  })
}