var express = require("express");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 8080;

// Require all models
var db = require("./models");

// Initialize Express
var server = express();

// Configure middleware

// Parse request body as JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// Make public a static folder
server.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articlesdb", { useNewUrlParser: true });

require("./public/routes/html-routes.js")(server,db);
require("./public/routes/api-routes.js")(server,db);

// Start the server
server.listen(PORT, function() {
  console.log("Port on " + PORT + "!");
});
