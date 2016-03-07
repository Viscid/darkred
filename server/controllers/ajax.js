var express = require('express'),
  Message = require('../models/message'),
  User = require('../models/user'),
  Post = require('../models/post'),
  router = express.Router(),
  ObjectId = require('mongodb').ObjectID;

router.get('/ihatetheworldandwanttodie', function(req, res) {

  var data = {};

  var lastGrab = req.query.grabbed;

  Message.count({ _recipient: req.user.id, read: false }, function(error, messageCount) {
    if (error) {
      res.status(500).send(error);
    } else {
      data.messageCount = JSON.stringify(messageCount);
      Post.count({ datetime: { $gt: lastGrab }}, function(error, postCount) {
        console.log(postCount);
        data.postCount = JSON.stringify(postCount);
        res.send(data);
      });
    }
  });

});

module.exports = router;
