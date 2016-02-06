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

var jwtSecret = 'jwtsecretcode';

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
var postController = require('./controllers/post')

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// passport middleware
app.use(require('express-session')({
  secret: '0z0z0z0z0z0099z8z7z6',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', userController);
app.use('/post/', postController);

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
