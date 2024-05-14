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

    }
}
module.exports = controller;