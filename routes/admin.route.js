var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin.controller')

router.get('/users', controller.users)

module.exports = router