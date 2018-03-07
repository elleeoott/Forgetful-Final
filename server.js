// Core dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');

//Port and connection

var port = process.env.PORT || 8080;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//Config

mongoose.connect(database.localUrl);

app.use(express.static('./public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));


//Routing

require('./app/routes.js')(app);

//Log out connection to terminal

app.listen(port);
console.log("Connected on port " + port);
