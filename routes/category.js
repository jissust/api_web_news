'use strict'

var express = require('express');
var CategoryController = require('../controllers/category');
var router = express.Router();

/** rutas */
router.post('/category/save', CategoryController.save);
router.put('/category/edit/:id', CategoryController.update);
router.get('/category/categories', CategoryController.getCategories);
router.delete('/category/:id', CategoryController.delete);
router.get('/category/:id', CategoryController.getCategory);
/** */

module.exports = router;