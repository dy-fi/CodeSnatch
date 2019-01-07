// enviroment variables
require('dotenv').config();

// Declarations
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const port = process.env.PORT || 3000;

const app = express();

// Express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose connect
require('./data/touchcode-db');

// static scripts and styles in public
app.use(express.static('public'));

// MIDDLEWARE body parser
app.use(bodyParser.urlencoded({ extended: true }));

// START
app.listen(port, console.log('App listening on port ' + port))
