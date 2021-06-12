var bookModel = require('../models/book.model')
var cloudinary = require('../cloudinary')
// var bookModel = Model.BookModel;

module.exports.index = function(req, res) {
  bookModel.find(function(err, books) {
    res.render('book/index',{
      books: books
    })
  })
}

module.exports.add = function(req, res){
  res.render("book/add")
}

module.exports.postAdd = function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(error, result) {
    // Book.create({
    //   title: req.body.title,
    //   description: req.body.description,
    //   image: result.url
    // })
    var book = new bookModel({
      title: req.body.title,
      description: req.body.description,
      image: result.url
    })
    book.save()
        .then(function(){
          res.redirect('/books')
          return;
        })
        .catch(function(err){
          console.log(err)
          res.redirect('/books/add')
        })
  })
}