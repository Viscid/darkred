// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Post = new Schema({
  authorid: { type: ObjectId },
  author: String,
  body: String,
  datetime: { type: Date, default: Date.now },
  rootId: { type: ObjectId },
  parentId: { type: ObjectId }
});

module.exports = mongoose.model('Post', Post);
