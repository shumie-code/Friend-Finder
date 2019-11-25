// Dependencies
// Series of NPM packagges that we wll use for server functionality
var express = require("express");
var path = require(path);

// Tells node this is an express server
var app = express();

//Set an initial port, to be used in application listener

var PORT = process.env.PORT || 8080;

// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());