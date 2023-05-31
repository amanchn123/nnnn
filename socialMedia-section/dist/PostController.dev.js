"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('mongoose'),
    mongoose = _require["default"];

var Usermodal = require('./modals/AuthModal');

var PostModel = require('./modals/PostModal');

var storyModel = require('./modals/storyModel');

var CreatePost = function CreatePost(req, resp) {
  var newPost;
  return regeneratorRuntime.async(function CreatePost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(new PostModel(req.body));

        case 3:
          newPost = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(newPost.save());

        case 6:
          resp.status(200).json(newPost);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          resp.status(500).json("unable to create");

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var getPost = function getPost(req, resp) {
  var _ref, userId, getpost;

  return regeneratorRuntime.async(function getPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(req.query);

        case 3:
          _ref = _context2.sent;
          userId = _ref.userId;
          _context2.next = 7;
          return regeneratorRuntime.awrap(PostModel.find({
            userId: userId
          }).sort({
            createdAt: -1
          }));

        case 7:
          getpost = _context2.sent;
          resp.status(200).json(getpost);
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          resp.status(500).json("unable to get post ");

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var updatePost = function updatePost(req, resp) {
  var userId, id, post;
  return regeneratorRuntime.async(function updatePost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.body.userId;
          id = req.query.id;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(PostModel.findById(id));

        case 5:
          post = _context3.sent;

          if (!(post.userId === userId)) {
            _context3.next = 12;
            break;
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(post.updateOne({
            $set: req.body
          }));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(post.save());

        case 11:
          resp.status(200).json(post);

        case 12:
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](2);
          resp.status(500).json("unable to update post");

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 14]]);
};

var deletePost = function deletePost(req, resp) {
  var id, post;
  return regeneratorRuntime.async(function deletePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.body.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(PostModel.findByIdAndDelete({
            _id: id
          }));

        case 4:
          post = _context4.sent;
          console.log("gaaa");
          resp.status(200).json('deleted success');
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          resp.status(500).json("unable to delete");

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var LikePost = function LikePost(req, resp) {
  var id, currentUserId, someOnespost;
  return regeneratorRuntime.async(function LikePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.query.id;
          currentUserId = req.body.currentUserId;
      
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(PostModel.findByIdAndUpdate({
            _id: id
          }));

        case 6:
          someOnespost = _context5.sent;
          

          if (someOnespost.likes.includes(currentUserId)) {
            _context5.next = 15;
            break;
          }

          
          _context5.next = 12;
          return regeneratorRuntime.awrap(someOnespost.updateOne({
            $push: {
              likes: currentUserId
            }
          }));

        case 12:
          resp.json('liked');
          _context5.next = 18;
          break;

        case 15:
          _context5.next = 17;
          return regeneratorRuntime.awrap(someOnespost.updateOne({
            $pull: {
              likes: currentUserId
            }
          }));

        case 17:
          resp.json('diliked');

        case 18:
          _context5.next = 23;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](3);
          

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 20]]);
};

var timeLinePost = function timeLinePost(req, resp) {
  var _ref2, userId, currentUserPost, followingPost;

  return regeneratorRuntime.async(function timeLinePost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(req.query);

        case 2:
          _ref2 = _context6.sent;
          userId = _ref2.userId;
          _context6.prev = 4;
          _context6.next = 7;
          return regeneratorRuntime.awrap(PostModel.find({
            userId: userId
          }).sort({
            createdAt: -1
          }));

        case 7:
          currentUserPost = _context6.sent;
          _context6.next = 10;
          return regeneratorRuntime.awrap(Usermodal.aggregate([{
            $match: {
              _id: new mongoose.Types.ObjectId(userId)
            }
          }, {
            $lookup: {
              from: "posts",
              localField: "following",
              foreignField: "userId",
              as: "followingPosts"
            }
          }, {
            $project: {
              followingPosts: 1,
              _id: 0
            }
          }]));

        case 10:
          followingPost = _context6.sent;
          resp.json(currentUserPost.concat.apply(currentUserPost, _toConsumableArray(followingPost[0].followingPosts)));
          _context6.next = 17;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](4);
          resp.json('unabale');

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[4, 14]]);
};

var Createstories = function Createstories(req, resp) {
  var _req$body, userId, story, createStory, storyCreated;

  return regeneratorRuntime.async(function Createstories$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, story = _req$body.story;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(new storyModel(req.body));

        case 4:
          createStory = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(createStory.save());

        case 7:
          storyCreated = _context7.sent;
          resp.status(200).json(storyCreated);
          _context7.next = 14;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](1);
          resp.status(500).json("unable to create post");

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 11]]);
};

var currentUserstory = function currentUserstory(req, resp) {
  var userId, getstory;
  return regeneratorRuntime.async(function currentUserstory$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          userId = req.body.userId;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(storyModel.find({
            userId: userId
          }));

        case 4:
          getstory = _context8.sent;
          resp.json(getstory);
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          resp.json(_context8.t0);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

var storyTimeline = function storyTimeline(req, resp) {
  var _ref3, userId, stories;

  return regeneratorRuntime.async(function storyTimeline$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(req.query);

        case 2:
          _ref3 = _context9.sent;
          userId = _ref3.userId;
          
          _context9.prev = 5;
          _context9.next = 8;
          return regeneratorRuntime.awrap(Usermodal.aggregate([{
            $match: {
              _id: new mongoose.Types.ObjectId(userId)
            }
          }, {
            $lookup: {
              from: "stories",
              localField: "following",
              foreignField: "userId",
              as: "followingStory"
            }
          }, {
            $project: {
              followingStory: 1
            }
          }, {
            $group: {
              _id: userId
            }
          }]));

        case 8:
          stories = _context9.sent;
          resp.json(stories[0]);
          _context9.next = 15;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](5);
          resp.json("unable to get");

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

module.exports = {
  CreatePost: CreatePost,
  getPost: getPost,
  updatePost: updatePost,
  deletePost: deletePost,
  LikePost: LikePost,
  timeLinePost: timeLinePost,
  Createstories: Createstories,
  currentUserstory: currentUserstory,
  storyTimeline: storyTimeline
};