'use strict'

var validator = require('validator');

var ArticleCategory = require('../models/article_category');

var controller = {
    save: async(req, res) => {
        var params = req.body;

        try{
            var article_category_article_id = !validator.isEmpty(params.article_id);
            var article_category_category_id = !validator.isEmpty(params.category_id);
        }catch(error){
            return res.status(200).send({
                status:'error',
                message: "Faltan datos por enviar"
            });
        }

        if( article_category_article_id && article_category_category_id){
            var article_category = new ArticleCategory();
            article_category.category_id = params.article_id;
            article_category.article_id = params.category_id;

            try{
                var result = await article_category.save();
                return res.status(200).send({
                    status:'success',
                    article: result
                });
            }catch(error){
                return res.status(404).send({
                    status:'error',
                    message:'La relacion entre artículo y categoría no se ha guardado',
                    error: err
                });
            }
        }else{
            return res.status(200).send({
                status:'error',
                message: "Faltan datos por enviar"
            });
        }

        return res.status(200).send({
            status:'success',
            message:"Save",
            params: req.body
        });
    }
}

module.exports = controller;