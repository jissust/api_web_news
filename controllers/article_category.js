'use strict'

var validator = require('validator');

var ArticleCategory = require('../models/article_category');

var controller = {
    getArticleCategory: (req, res) => {
        var articleCategoryId = req.params.id;
        if(!articleCategoryId || articleCategoryId == null){
            return res.status(404).send({
                status:'error',
                message:'No existe el articulo'
            });
        }

        ArticleCategory.findOne({article_id: articleCategoryId})
        .then( result => {
            return res.status(200).send({
                status:'success',
                article: result
            });
        })
        .catch( err => {
            return res.status(500).send({
                status:'error',
                message:'Error a devolver los datos',
                err: err
            });
        })
    },
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
            article_category.category_id = params.category_id;
            article_category.article_id = params.article_id;

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
    },
    update: (req, res) => {
        var articleId = req.params.article_id;
        var params = req.body;

        ArticleCategory
        .findOneAndUpdate({article_id: articleId}, params,{new:true})
        .then( element => {
            return res.status(200).send({
                status: "success",
                res: element
            })
        })
        .catch( error => {
            return res.status(200).send({
                status: "error",
                error: error
            })
        });
    }
}

module.exports = controller;