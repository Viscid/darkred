var express = require('express'),
  UserProfile = require('../models/userProfile'),
  User = require('../models/user'),
  router = express.Router(),
  ObjectId = require('mongodb').ObjectID;

router.get('/:username', function(req, res) {
  console.log('User ' + req.user.username + ' is viewing profile \'' + req.params.username + '\'');

  User.findOne({username: req.params.username}, '_id', function(error, user) {
    if (error) {
      console.log(error);
      res.status(500).send();
    } else {
        UserProfile.findOrCreate({
            _user: user._id
          }, function(error, profile, created) {
            if (error) {
              console.log('Error in profile findorcreate');
            }

            UserProfile.findOne({_user: profile._user})
            .populate('_user')
            .exec(function(error, profile) {
              res.send(profile);
            });

          });
    }
  });
});

router.post('/:username', function(req, res) {
  res.send();
});


module.exports = router;
