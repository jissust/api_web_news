'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var router = express.Router();

/** rutas */
router.get('/users', UserController.getUsers)
router.post('/user/create', UserController.save)
router.put('/user/:id', UserController.update)
router.delete('/user/:id', UserController.delete)
router.get('/user/:id', UserController.getUser);
/** */

module.exports = router;