var express = require('express')
var router = express.Router();
var multer  = require('multer');
const upload = multer({ dest: "./public/uploads/books/" });
var controller = require('../controllers/book.controller')

router.get("/", controller.index)

router.get("/add", controller.add)
router.post("/add", upload.single("image"), controller.postAdd)

module.exports = router