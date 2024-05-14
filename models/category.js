'use strict'

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var CategorySchema = Schema({
    name: String,
    autor: String,
    date:{ Type: Date}
 });

 module.exports = mongoose.model('Category', CategorySchema);