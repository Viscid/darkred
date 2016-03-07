// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt');

var jwtSecret = require('./jwtsecret.js');

// mongoose
mongoose.connect('mongodb://localhost/darkred');

// user schema/model
var User = require('./models/user.js');

passport.use(User.createStrategy());

// create instance of express
var app = express();

app.use(expressJwt({ secret: jwtSecret, credentialsRequired: false }));

// require routes
var userController = require('./controllers/user');
var postController = require('./controllers/post');
var userProfileController = require('./controllers/userProfile');
var messageController = require('./controllers/message');
var ajaxController = require('./controllers/ajax')

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

var MongoStore = require('connect-mongo')(expressSession);

// passport middleware

var mongoStore = new MongoStore({ url: 'mongodb://localhost/darkred' });

app.use(expressSession({
  secret: '0z0z0z0z0z0099z8z7z6',
  store: mongoStore,
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
  console.log(req.user);
  next();
});

// Socket.io


app.use(express.static(path.join(__dirname, 'public')));

// configure passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  next();
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', userController);
app.use('/post/', postController);
app.use('/profile/', userProfileController);
app.use('/message/', messageController);
app.use('/ajax/', ajaxController);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;
