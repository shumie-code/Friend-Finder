// Dependencies
// Series of NPM packages that we wll use for server functionality
var express = require("express");
var path = require("path");

// Tells node this is an express server
var app = express();

//Set an initial port, to be used in application listener

var PORT = process.env.PORT || 8080;

// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Directs server to the route files that give server a map of how to respond when users visit or request data from various urls

require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

//Listener
// This code starts the server by accessing the port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});