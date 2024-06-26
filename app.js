'use strict'

// Cargar modulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas
var article_routes = require('./routes/article');
var category_routes = require('./routes/category');
var article_category = require('./routes/article_category');
var article_carrusel = require('./routes/article_carrusel');
var user_routes = require('./routes/user')
// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Anadir prefijos o rutas
app.use('/api', article_routes);
app.use('/api', category_routes);
app.use('/api', article_category);
app.use('/api', article_carrusel);
app.use('/api', user_routes);

// exportar modulos  (fichero actual)
module.exports = app;
