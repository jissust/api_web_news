'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    url_image: String
},{
    timestamps:true
})

module.exports = mongoose.model('User', UserSchema)
