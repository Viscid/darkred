var express = require('express'),
  Post = require('../models/post.js'),
  router = express.Router(),
  ObjectId = require('mongodb').ObjectID;

router.post('/new', function(req, res) {
  console.log('User ' + req.user.username + ' is posting ' + req.body.body);

  var post = new Post({
    authorid: ObjectId(req.user.id),
    author: req.user.username,
    body: req.body.body
  });

  post.save();
  res.send();
});

router.post('/reply', function(req, res) {
  console.log('User ' + req.user.username + ' is replying ' + req.body.body);

  var parentId = ObjectId(req.body.parentId);
  var rootId;

  console.log(parentId);

  Post.findOne({
    _id: parentId
  }, function(error, parentPost) {
    console.log(parentPost);

    if (parentPost) {
      rootId = parentPost.rootId;
    }

      if (!rootId) {
        rootId = parentId;
      }

      var post = new Post({
        authorid: ObjectId(req.user.id),
        author: req.user.username,
        parentId: parentId,
        rootId: rootId,
        body: req.body.body
      });

      post.save();
      res.send();

  });


})


router.get('/all', function(req, res) {

  var threadReplyIds = [];

  var results = {};
  var replyList = {};

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

          if (reply['parentId']) {
            if (!replyList[reply.parentId]) {
              replyList[reply.parentId] = [];
            }
            replyList[reply.parentId].push(reply);
          }

          results.replyList = replyList;


        })

        res.send(results);
      })
    } else {

      res.send(results);
    }


  }).sort({
    datetime: -1
  });
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

module.exports = router;
