var express = require('express');
var passport = require('passport');
var User = require('../models/user.js');
var router = express.Router();

var jwt = require('jsonwebtoken');

var jwtSecret = 'jwtsecretcode';

router.post('/register', function(req, res) {
  console.log("Location: /user/register");

  var username = req.body.username,
    password = req.body.password,
    email = req.body.email;

  User.register(new User({
    email: email,
    username: username
  }), password, function(error) {
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
    } else {
      res.status(200).send(); // User successfully created.
    }
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log("Location: /user/login");

  var username = req.user.username,
    password = req.user.password,
    id = req.user.id;

  var token = jwt.sign({
    user: {
      username: username,
      id: id
    }
  }, jwtSecret);

  res.send({
    user: {
      username: username,
      id: id
    },
    token: token
  });


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

})

router.post('/login')

router.get('/logout', function(req, res) {
  console.log("Location: /user/logout");
  req.logout();
  res.status(200).send();
});

module.exports = router;
