// enviroment variables
require('dotenv').config();

// Declarations
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');

const app = express();

port = process.env.PORT || 3000;

// Express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose connect
require('./data/CodeSnatch-db');

// static scripts and styles in public
app.use(express.static('public'));

// MIDDLEWARE file upload
app.use(fileUpload());

// MIDDLEWARE body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// MIDDLEWARE cookie parser
app.use(cookieParser());

// MIDDLEWARE authentication
var checkAuth = (req, res, next) => {
    console.log("Checking authentication...");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
        console.log("Auth Failed")
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};

app.use(checkAuth);

require('./controllers/snip')(app);
require('./controllers/auth')(app);

// START
app.listen(port, console.log("App listening on port " + port));

module.exports = app;
