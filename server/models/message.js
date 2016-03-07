// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Message = new Schema({
  _sender: { type: ObjectId, ref: 'User'},
  _recipient: { type: ObjectId, ref: 'User'},
  body: { type: String },
  datetime: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Message', Message);
