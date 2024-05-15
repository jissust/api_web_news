'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Article_CategorySchema = Schema({
    'category_id': String,
    'article_id': String,
    'author': String
},{
    timestamps:true
})

module.exports = mongoose.model('Article_Category', Article_CategorySchema)