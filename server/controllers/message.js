var express = require('express'),
  Message = require('../models/message'),
  User = require('../models/user'),
  router = express.Router(),
  ObjectId = require('mongodb').ObjectID;

router.get('/inbox', function(req, res) {
  console.log('User ' + req.user.username + ' is checking their messages');

  Message.find({ _recipient: req.user.id  }, function(error, messages) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(messages);
      Message.update({ _recipient: req.user.id }, { read: true }, { multi: true }).exec();

    }
  })
  .populate('_sender')
  .sort({datetime: -1});

});

router.post('/send', function(req, res) {
  console.log('User ' + req.user.username + ' is sending a message');

  var recipient = req.body.recipient,
      body = req.body.body;

  var message = new Message({
    _sender: req.user.id,
    _recipient: recipient,
    body: body
  });

  message.save();
  res.send();

});

module.exports = router;
