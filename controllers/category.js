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
            category.autor = null;

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
    }
}

module.exports = controller;