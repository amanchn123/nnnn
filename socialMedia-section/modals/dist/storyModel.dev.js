"use strict";

var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  likes: [],
  story: [],
  userId: {
    type: String,
    require: true
  },
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
var storyModel = mongoose.model("story", storySchema);
module.exports = storyModel;