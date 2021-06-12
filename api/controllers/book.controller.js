var Book = require('../../models/book.model')

module.exports.index = async function(req, res) {
  res.json(await Book.find())
}