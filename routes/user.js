
/*
 * GET users listing.
 */
var express = require('express')
var app = express();
 var  mongo = require('mongodb')
  , mongoose = require('mongoose')
  , path = require('path');

var db = mongoose.connect('mongodb://127.0.0.1:27017/website');
var Schema = mongoose.Schema;

mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	username : String,
	email : String,
	fullname : String,
	age : Number,
	location : String,
	gender : String
   
});

var User = mongoose.model('userlist', UserSchema);



app.get('/userlist', function (req, res) {
    User.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

module.exports = app;