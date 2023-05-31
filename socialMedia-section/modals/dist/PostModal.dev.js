"use strict";

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  userId: String,
  desc: String,
  // duration: durationInMinutes,
  likes: [],
  image: String,
  username: String,
  createdAt: {
    type: Date,
    "default": Date.now,
    get: function get(timestamp) {
      return timestamp.getSeconds();
    }
  }
}, {
  timeStamps: true
});
var PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;