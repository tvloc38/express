var User = require('../models/user.model')
// var User = Model.UserModel

module.exports.users = function(req, res) {
  User
    .find()
    .then(function(users){
      res.render('admin/users',{
        users: users
      })
    })
    .catch(function(err){
      console.log(err)
    })
}