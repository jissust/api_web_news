'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Article_CarruselSchema = Schema({
    'url': String,
    'name': String,
    'article_id': String
},{
    timestamps: true
})

module.exports = mongoose.model('Article_Carrusel', Article_CarruselSchema)