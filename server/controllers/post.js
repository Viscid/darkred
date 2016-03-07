var express = require('express'),
  Post = require('../models/post'),
  UserProfile = require('../models/userProfile'),
  router = express.Router(),
  ObjectId = require('mongodb').ObjectID;

  var passport = require('passport');

router.post('/new', function(req, res) {
  console.log('User ' + req.user.username + ' is posting ' + req.body.body);

  var post = new Post({
    authorid: ObjectId(req.user.id),
    author: req.user.username,
    body: req.body.body
  });

  post.save();

  UserProfile.findOneAndUpdate({_user: ObjectId(req.user.id)}, {lastPost: new Date()}).exec();
  res.send();
});

router.post('/reply', function(req, res) {
  console.log('User ' + req.user.username + ' is replying ' + req.body.body);

  var parentId = ObjectId(req.body.parentId);
  var rootId;

  Post.findOne({
    _id: parentId
  }, function(error, parentPost) {

    if (parentPost) {
      rootId = parentPost.rootId || parentId;

      Post.findOneAndUpdate( //Update the root post's lastReply
        {
          _id: rootId
        }, {
          lastReply: new Date()
        }
      ).exec();

    }

    var post = new Post({
      authorid: ObjectId(req.user.id),
      author: req.user.username,
      parentId: parentId,
      rootId: rootId,
      body: req.body.body
    });

    post.save();

    UserProfile.findOneAndUpdate({_user: ObjectId(req.user.id)}, {lastPost: new Date()}).exec();
    res.send();

  });


})


router.get('/all', function(req, res) {

  var threadReplyIds = [];

  var results = {};
  var replyList = {};

  var replyByThread = {};

  results.grabbed = new Date();

  Post.find({
    parentId: null //Find all threads
  }, function(error, threads) {

    results.threads = threads;

    threads.forEach(function(thread) {
      threadReplyIds.push(thread._id); // Make an array of thread IDs
    });

    if (threadReplyIds.length > 0) {
      Post.find({
        rootId: {
          $in: threadReplyIds // Search for all replies that are in each thread
        }
      }, function(error, replies) {

        results.replies = replies;

        replies.forEach(function(reply) {

          reply = reply.toObject();

          if (reply['parentId']) {
            if (!replyList[reply.parentId]) {
              replyList[reply.parentId] = [];
            }

            if (!replyByThread[reply.rootId]) {
              replyByThread[reply.rootId] = [];
            }

            replyList[reply.parentId].push(reply);

            replyByThread[reply.rootId].push(reply._id.toString());


          }

        });

        results.replyList = replyList;

        var replyOrder = {};

        for (var prop in replyByThread) {
          for(var i = 0; i < replyByThread[prop].length; i++) {
            replyOrder[replyByThread[prop][i]] = i;
          }
        }

        results.replyOrder = replyOrder;

        res.send(results);
      }).sort({
        datetime: -1
      })
    } else {
      res.send(results);
    }
  }).sort({
    lastReply: -1
  });
});

router.get('/user/:userId', function(req, res) {
  Post.find({authorid: req.params.userId}, function(error, results) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  }).sort({
    datetime: -1
  }).limit(20);
});

router.get('/thread/:postId', function(req, res) {
  var results = {};
  var replyList = {};

  Post.findOne({
      _id: req.params.postId
    },
    function(error, post) {

      results.post = post;

      Post.find({
        rootId: post._id
      }, function(error, replies) {

        replies.forEach(function(reply) {

          if (reply['parentId']) {
            if (!replyList[reply.parentId]) {
              replyList[reply.parentId] = [];
            }
            replyList[reply.parentId].push(reply);
          }

          results.replyList = replyList;

        });

        res.send(results);
      });
    });
});

router.post('/search', function(req, res) {
  var searchTerm = req.body.searchTerm;
  console.log('Searching for: ' + searchTerm);

  Post.textSearch(searchTerm, function(error, results) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  })
});





module.exports = router;
