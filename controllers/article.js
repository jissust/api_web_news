'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Article = require('../models/article');
var ArticleCarrusel = require('../models/article_carrusel');

var controller = {
    datosCurso: (req, res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            curso: "Master en framework js",
            autor: "jesus tissera",
            url: "httos://jesustissera.com",
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: "soy la acción test de mi controlador de artículos"
        });
    },

    save: async (req, res) => {
        var params = req.body;
        
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(200).send({
                status:'error',
                message: "Faltan datos por enviar"
            });     
        }

        if(validate_title && validate_content){
            var article = new Article(); 
            article.title = params.title;
            article.content = params.content;
            article.image = null;
            if(params.image){
                article.image = params.image;
            }

            try {
                var result = await article.save();
                return res.status(200).send({
                    status:'success',
                    article: result
                });

            } catch(err) { 
                return res.status(404).send({
                    status:'error',
                    message:'El articulo no se ha guardado',
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
    getArticles: async(req, res) => {
        var query = Article.find({}); 
        var last = req.params.last;
        
        if(last || last != undefined){
            query.limit(last);
        }

        await query.sort('-_id')
                .exec()
                .then( articles => {
                    return res.status(200).send({
                        status:'success',
                        articles
                    });
                })
                .catch( error => {
                    return res.status(200).send({
                        status:'error',
                        message:'No hay articulos para mostrar'
                    });
                });
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
    update: (req, res) => {
        var articleId = req.params.id;
        var params = req.body;
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(er){
            return res.status(200).send({
                status:'error',
                message:'Faltan datos por enviar'
            });            
        }

        if(validate_title && validate_content){ 
            Article.findOneAndUpdate({_id:articleId},params,{new:true})
            .then( art => {
                return res.status(200).send({
                    status:'success',
                    art
                });
            })
            .catch( (error) => {
                return res.status(500).send({
                    status:'error',
                    message:'no se actualizaron los datos'
                });
            });

        }else{
            return res.status(500).send({
                status:'error',
                message:'Error al actualizar',
            });
        }
    },
    delete:(req, res) => {
        var articleId = req.params.id;
        Article.findOneAndDelete({_id:articleId},{new:true})
        .then( articleRemoved => {
            return res.status(200).send({
                status:'success',
                articleRemoved,
            });
        })
        .catch( err => {
            return res.status(500).send({
                status:'error',
                message:'Error al borrar',
            });
        })
    },
    upload:async(req, res) => {
        var result = [];
        var file_name = 'No hay imagenes cargadas';
        if(!req.files){
            return res.status(404).send({
                status:'error',
                message: file_name,
            });
        }

        if(req.files.file){
            if(req.files.file.length){
                try{
                    req.files.file.forEach( (item) => {
                        var itemResult = controller.saveArticleCarrusel(item, req.params.id);
                        result.push(itemResult);  
                    })
                    return res.status(200).send({
                        status:'success',
                        result: result,
                    });
                } catch(err) {
                    return res.status(200).send({
                        status: "error",
                        message: err
                    });
                }
            }else{
                try{
                    var itemResult = await controller.saveArticleCarrusel(req.files.file, req.params.id);
                    result.push(itemResult);
                    return res.status(200).send({
                        status:'success',
                        result: result,
                    });
                }catch(err){
                    return res.status(200).send({
                        status: "error",
                        message: err
                    });
                }
            }
        }else{
            return res.status(200).send({
                status: "error",
                message: "no se seleccionaron archivos"
            });
        }
    },
    saveArticleCarrusel: (file, articleId) => {
        //var file_path = req.files.file.path;
        
        var file_path = file.path; 
        var file_split = file_path.split('\\');

        var file_name = file_split[2];

        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            /*fs.unlink(file_path, (err) => {
                return "La extensión de la imagen no es válida";
            });*/
            return {
                "status": "error",
                "message": "La extensión de la imagen no es válida: " + file_name
            };
        }else{
            //var articleId = req.params.id;
            if(articleId){
                let article_carrusel = new ArticleCarrusel();
                article_carrusel.url = './upload/articles/';
                article_carrusel.name = file_name;
                article_carrusel.article_id = articleId;
                article_carrusel.save();

                return article_carrusel;
                
            }/*else{
                return res.status(200).send({
                    status: "success",
                    image: file_name
                });
            }*/
        }
    },
    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;
        
        fs.exists(path_file, (exist) => {
            if(exist){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "la imagen no existe"
                });                
            }
        });
    },
    search: (req, res) => {
        var searchString = req.params.search;

        Article.find({ "$or": [
            {"title":{"$regex": searchString, "$options":"i"}},
            {"content":{"$regex": searchString, "$options":"i"}}
        ]})
        .sort([['date', 'descending']])
        .exec()
        .then(articles => {
            return res.status(200).send({
                status: "success",
                articles
            });
        })
        .catch(error => {
            return res.status(404).send({
                status: "error",
                message: "search",
                searchString
            });
        });
    }
}

module.exports = controller;