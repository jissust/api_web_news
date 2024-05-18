'use strict'

var express = require('express');
var ArticleCarruselController = require('../controllers/article_carrusel');
var router = express.Router();

router.delete('/article_carrusel/:id', ArticleCarruselController.delete);
router.get('/article_carrusel/:id', ArticleCarruselController.getArticleCarrusel)

module.exports = router;