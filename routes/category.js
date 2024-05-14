'use strict'

var express = require('express');
var CategoryController = require('../controllers/category');
var router = express.Router();

/** rutas */
router.post('/category/save', CategoryController.save);
/** */

module.exports = router;