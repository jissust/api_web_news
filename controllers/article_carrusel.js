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
    },
    delete:(req, res) => {
        var articleCarruselId = req.params.id;
        
        ArticleCarrusel.findOneAndDelete({_id:articleCarruselId},{new:true})
        .then( articleCarruselRemoved => {
            return res.status(200).send({
                status:'success',
                articleCarruselRemoved,
            });
        })
        .catch( err => {
            return res.status(500).send({
                status:'error',
                message:'Error al borrar',
            });
        })
    },
    getArticleCarrusel: (req, res) => {
        var articleId = req.params.id;
        if(!articleId || articleId == null){
            return res.status(404).send({
                status:'error',
                message:'No existe el articulo'
            });
        }

        ArticleCarrusel.find({article_id: articleId})
        .then( articleCarruselNew => {
            
            return res.status(200).send({
                status:'success',
                res: articleCarruselNew
            })

        })
        .catch( err => {
            return res.status(500).send({
                status:'error',
                message:'Error al borrar',
            });
        })
    }
}

module.exports = controller;