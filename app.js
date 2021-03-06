require('dotenv').config()

// Declarations
const express = require('express');
const favicon = require('serve-favicon')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

// // HTTPS
// const https = require("https"),
//   fs = require("fs");
//
// const options = {
//   key: fs.readFileSync("SSL/privkey.pem"),
//   cert: fs.readFileSync("SSL/fullchain.pem")
// };

// export/environment
const app = express();
port = process.env.PORT || 3000;

// favicon
app.use(favicon(__dirname + '/public/resources/favicon.ico'));

// Express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose connect
require('./config/CodeSnatch-db');

// static scripts and styles in public
app.use(express.static('public'));

app.use(morgan('tiny'));

// MIDDLEWARE file upload
app.use(fileUpload({
    safeFileNames: true,
}));

// MIDDLEWARE body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// AUTHENTICATION

// passport config
require('./config/passport')(passport);

// session storage
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/CodeSnatch-db',
  collection: 'sessions',
});

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        // maxAge: 360000 // an hour
        // secure: true,   // turn this on in production
    },
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
// controllers
require('./controllers/index')(app);
require('./controllers/snip')(app);
require('./controllers/frame')(app);
require('./controllers/user')(app);
require('./controllers/auth')(app, passport);

// START
app.listen(port, console.log('App listening on port ' + port));
// https.createServer(options, app).listen(8080);

module.exports = app;
