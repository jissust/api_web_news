'use strict'

var express = require('express');
var ArticleCategoryController = require('../controllers/article_category');
var router = express.Router();

router.post('/article_category/save', ArticleCategoryController.save)

module.exports = router;