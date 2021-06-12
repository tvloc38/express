var User = require('../models/user.model');
// var User = Model.UserModel

module.exports.isAdmin = function (req, res, next) {
  User.findById(req.signedCookies.userId, function(err, user){
    if (!user) {
      res.redirect('/')
    } else {
      if (!user.isAdmin) {
        res.redirect('/')
      } else {
        next()
      }
    }
  })
}