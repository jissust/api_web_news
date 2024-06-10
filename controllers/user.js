'use strict'

const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var User = require('../models/user');

var controller = {
    getUsers: async(req, res) => {
        var query = User.find({});
        
        await query.sort('-_id')
        .exec()
        .then( result => {
            return res.status(200).send({
                status:'success',
                result:result
            });
        })
        .catch( error => {
            return res.status(200).send({
                status:'error',
                message:'No hay articulos para mostrar'
            });
        });
    },
    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email});
        
        if(!user){
            return res.status(200).send({
                status: 'error',
                message: 'error email/password'
            });
        }

        const eq = bcrypt.compareSync(req.body.password, user.password);

        if(!eq){
            return res.status(200).send({
                status: 'error',
                message: 'error email/password'
            });
        }

        try {
            const token = controller.createToken(user);
            return res.status(200).send({
                status: 'success',
                token: token  
            })
        } catch (error) {

            return res.status(500).send({
                status: 'error',
                message: 'Error al crear token de acceso'  
            })
        }
    },
    save: async(req, res) => {
        var params = req.body;

        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email);
            var validate_password = !validator.isEmpty(params.password);

        }catch(err){
            return res.status(200).send({
                status:'error',
                message: "Faltan datos por enviar"
            });
        }

        if(
            validate_name && 
            validate_surname && 
            validate_email && 
            validate_password
        ){
            var user = new User();
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email;
            user.password = bcrypt.hashSync(params.password, 12);
            user.url_image_profile = params.url_image_profile;

            try{
                var result = await user.save();
                return res.status(200).send({
                    status:'success',
                    category: result
                });
            }catch(err){
                return res.status(200).send({
                    status:'error',
                    article:"Los datos son invalidos"
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
        var userId = req.params.id;
        var params = req.body;

        try{
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email);
            var validate_password = !validator.isEmpty(params.password);

        }catch(err){
            return res.status(200).send({
                status:'error',
                message:'Faltan datos por enviar'
            });
        }

        if(
            validate_name && 
            validate_surname && 
            validate_email && 
            validate_password
        ){
            User
            .findOneAndUpdate({_id: userId}, params, {new:true})
            .then( result => {
                return res.status(200).send({
                    status:'success',
                    result
                });
            })
            .catch((error) => {
                return res.status(500).send({
                    status:'error',
                    message:'Error al actualizar',
                });
            })

        }else{
            return res.status(500).send({
                status:'error',
                message:'Error al actualizar',
            });
        }
    },
    delete: (req, res) => {
        var userId = req.params.id;
        var params = req.body;
        User
        .findOneAndDelete({_id: userId}, params, {new:true})
        .then( result => {
            return res.status(200).send({
                status: "success",
                result
            })
        })
        .catch( err => {
            return res.status(500).send({
                status:'error',
                message:'Error al borrar',
            });
        })
    },
    getUser: (req, res) => {
        var userId = req.params.id;
        
        if(!userId || userId == null){
            return res.status(404).send({
                status:'error',
                message:'No existe el usuario'
            });
        }

        User.findById(userId)
        .then( result => {
            return res.status(200).send({
                status:'success',
                result
            });
        })
        .catch( error => {
            return res.status(500).send({
                status:'error',
                message:'Error a devolver los datos',
                error
            });
        })
    },
    createToken: (user) => {
        const payload = {
            user_id: user._id,
            user_email: user.email
        }
        return jwt.sign(payload, 'user')
    }
};

module.exports = controller;