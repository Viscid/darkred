// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    findorcreate = require('mongoose-findorcreate'),
    ObjectId = Schema.Types.ObjectId;

var UserProfile = new Schema({
  _user: { type: ObjectId, ref: 'User'},
  location: { type: String },
  website: { type: String },
  numPosts: { type: Number },
  regDate: { type: Date },
  lastPost: { type: Date },
  lastLogin: { type: Date }
});

UserProfile.plugin(findorcreate);

module.exports = mongoose.model('UserProfile', UserProfile);
