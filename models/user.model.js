var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  avatar: String,
  password: String,
  isAdmin: Boolean
})

var User = mongoose.model('User', userSchema, 'users')

module.exports = User