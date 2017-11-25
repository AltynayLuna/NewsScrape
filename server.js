var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var db = require("./models");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
mongoose.Promise = Promise;

var PORT = 3000;

var app = express();

var data;

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/controllers.js");
app.use("/", routes);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
