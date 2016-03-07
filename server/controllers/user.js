var express = require('express');
var passport = require('passport');
var User = require('../models/user'),
    UserProfile = require('../models/userProfile');
var router = express.Router();

var jwt = require('jsonwebtoken');

var jwtSecret = require('../jwtsecret.js');

router.post('/register', function(req, res) {
  console.log("Location: /user/register");

  var username = req.body.username,
    password = req.body.password,
    email = req.body.email;

  User.register(new User({
    email: email,
    username: username
  }), password, function(error, user) {
    if (error) {
      if (error.code === 11000) // Duplicate e-mail
      {
        res.status(500).send({
          error: 'That e-mail is already registered.'
        });
      } else if (error) {
        res.status(500).send({
          error: error
        });
      }
    } else { // User successfully created.

      var username = user.username,
        password = user.password,
        id = user._id;

        UserProfile.create({_user: user._id, lastPost: null, numPosts: 0, regDate: new Date(), lastLogin: new Date()});


      var token = jwt.sign({
        username: username,
        id: id
      }, jwtSecret);

      var response = {
        user: {
          username: username,
          id: id
        },
        token: token
      }

      res.send(response);

    }
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log("Location: /user/login");

  var username = req.user.username,
    password = req.user.password,
    id = req.user.id;

  var token = jwt.sign({
    username: username,
    id: id
  }, jwtSecret);

  var response = {
    user: {
      username: username,
      id: id
    },
    token: token
  }

  UserProfile.findOneAndUpdate({_user: id}, {lastLogin: new Date()}).exec();
  res.send(response);

});

router.post('/me', function(req, res) {
  var username = req.user.username,
    id = req.user.id;

  res.send({
    user: {
      username: username,
      id: id
    }
  });

  UserProfile.findOneAndUpdate({_user: id}, {lastLogin: new Date()}).exec();

})

router.get('/logout', function(req, res) {
  console.log("Location: /user/logout");
  req.logout();
  res.status(200).send();
});

module.exports = router;
