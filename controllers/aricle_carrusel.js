'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var ArticleCarrusel = require('../models/article_carrusel');

var controller = {
    uploadImage: (req, res) => {
        
        return res.status(200).send({
            message: "article carrusel metodo save",
            res: req.files
        });
    }
}

module.exports = controller;