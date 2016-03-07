// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    textSearch = require('mongoose-text-search'),
    ObjectId = Schema.Types.ObjectId;

var Post = new Schema({
  authorid: { type: ObjectId, ref: 'Post' },
  author: String,
  body: String,
  datetime: { type: Date, default: Date.now },
  rootId: { type: ObjectId, ref: 'Post' },
  parentId: { type: ObjectId, ref: 'Post' },
  lastReply: { type: Date, default: Date.now }
});

Post.plugin(textSearch);
Post.index({ body: 'text' });


module.exports = mongoose.model('Post', Post);
