'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Category = require('../models/category');

var controller = {
    save: async(req, res) => {
        var params = req.body;
        try{
            var validate_name = !validator.isEmpty(params.name);
        }catch(err){
            return res.status(200).send({
                status:'error',
                message: "Faltan datos por enviar"
            });
        }

        if(validate_name){
            var category = new Category();
            category.name = params.name;
            category.autor = params.autor;

            try{
                var result = await category.save();
                return res.status(200).send({
                    status:'success',
                    category: result
                });
            }catch(err){
                return res.status(404).send({
                    status:'error',
                    message:'La categoria no se ha guardado',
                    error: err
                });
            }
        }else{
            return res.status(200).send({
                status:'error',
                article:"Los datos son invalidos"
            });
        }
    },
    update: (req, res) => {
        var categoryId = req.params.id;
        var params = req.body;

        try{
            var validate_name = !validator.isEmpty(params.name);
        }catch(err){
            return res.status(200).send({
                status:'error',
                message:'Faltan datos por enviar'
            });
        }

        if(validate_name){
            Category
            .findOneAndUpdate({_id: categoryId}, params,{new:true})
            .then(cat => {
                return res.status(200).send({
                    status:'success',
                    cat
                });
            })
            .catch( (error) => {
                return res.status(500).send({
                    status:'error',
                    message:'no se actualizaron los datos'
                });
            })
        }else{
            return res.status(500).send({
                status:'error',
                message:'Error al actualizar',
            });
        }
    },
    getCategories: async(req, res) => {
        var query = Category.find({}); 
        //var last = req.params.last;
        
        /*if(last || last != undefined){
            query.limit(last);
        }*/

        await query.sort('-_id')
                .exec()
                .then( category => {
                    return res.status(200).send({
                        status:'success',
                        category
                    });
                })
                .catch( error => {
                    return res.status(200).send({
                        status:'error',
                        message:'No hay articulos para mostrar'
                    });
                });
    },
    delete:(req, res) => {
        var categoryId = req.params.id;
        Category
        .findOneAndDelete({_id:categoryId},{new:true})
        .then( categoryRemoved => {
            return res.status(200).send({
                status:'success',
                categoryRemoved,
            });
        })
        .catch( err => {
            return res.status(500).send({
                status:'error',
                message:'Error al borrar',
            });
        })
    },
    getArticle: (req, res) => {
        var articleId = req.params.id;
        
        if(!articleId || articleId == null){
            return res.status(404).send({
                status:'error',
                message:'No existe el articulo'
            });
        }
        
        Article.findById(articleId)
            .then( article => {
                return res.status(200).send({
                    status:'success',
                    article
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
    getCategory: (req, res) => {
        var categoryId = req.params.id;
        
        if(!categoryId || categoryId == null){
            return res.status(404).send({
                status:'error',
                message:'No existe el articulo'
            });
        }
        
        Category.findById(categoryId)
            .then( category => {
                return res.status(200).send({
                    status:'success',
                    category
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
}

module.exports = controller;