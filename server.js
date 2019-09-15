var express = require("express");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 8080;

// Require all models
var db = require("./models");

var server = express();

// Configure middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// Make public a static folder
server.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
//mongoose.connect("mongodb://localhost/articlesdb", { useNewUrlParser: true });
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./public/routes/html-routes.js")(server,db);
require("./public/routes/api-routes.js")(server,db);

// Start the server
server.listen(PORT, function() {
  console.log("Port on " + PORT + "!");
});
