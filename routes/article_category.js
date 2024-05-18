'use strict'

var express = require('express');
var ArticleCategoryController = require('../controllers/article_category');
var router = express.Router();

router.post('/article_category/save', ArticleCategoryController.save)
router.get('/article_category/:id', ArticleCategoryController.getArticleCategory)
router.put('/article_category/article_id/:article_id', ArticleCategoryController.update);

module.exports = router;