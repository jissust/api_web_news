'use strict'

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var CategorySchema = Schema({
    name: String,
    autor: String,
    date:{ type: Date, default: Date.now},
 });

 module.exports = mongoose.model('Category', CategorySchema);