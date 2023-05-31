"use strict";

var Usermodal = require('./modals/AuthModal');

var bcrypt = require('bcrypt');

var getUser = function getUser(req, resp) {
  var ids, response;
  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(req.body.id);

        case 2:
          ids = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(Usermodal.find({
            _id: {
              $in: ids
            }
          }));

        case 6:
          response = _context.sent;
          console.log('Retrieved documents:', response);
          resp.json(response) // client.close();
          ;
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          console.log('nahiiii');
          resp.status(500).json(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 11]]);
};

var getAlluser = function getAlluser(req, resp) {
  var result;
  return regeneratorRuntime.async(function getAlluser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Usermodal.find({}).select("-password"));

        case 3:
          result = _context2.sent;
          resp.status(200).json({
            result: result,
            success: true
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          resp.status(500).json({
            success: false
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var updateuser = function updateuser(req, resp) {
  var id, _req$body, currentUser, adminStatus, password, salt, response;

  return regeneratorRuntime.async(function updateuser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.query.id;
          _req$body = req.body, currentUser = _req$body.currentUser, adminStatus = _req$body.adminStatus, password = _req$body.password;

          if (!(currentUser === id || adminStatus)) {
            _context3.next = 22;
            break;
          }

          _context3.prev = 3;

          if (!password) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 7:
          salt = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 10:
          req.body.password = _context3.sent;

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(Usermodal.findByIdAndUpdate(id, req.body, {
            "new": true
          }));

        case 13:
          response = _context3.sent;
          resp.status(200).json(response);
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](3);
          resp.status(500).json(_context3.t0);

        case 20:
          _context3.next = 23;
          break;

        case 22:
          resp.json("excess denied");

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

var deleteUser = function deleteUser(req, resp) {
  var id, _req$body2, currentUser, adminStatus, password, response;

  return regeneratorRuntime.async(function deleteUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.query.id;
          _context4.prev = 1;
          _req$body2 = req.body, currentUser = _req$body2.currentUser, adminStatus = _req$body2.adminStatus, password = _req$body2.password;

          if (!(currentUser == id || adminStatus)) {
            _context4.next = 8;
            break;
          }

          _context4.next = 6;
          return regeneratorRuntime.awrap(Usermodal.findByIdAndDelete(id));

        case 6:
          response = _context4.sent;
          resp.status(200).json("deleted succesfully");

        case 8:
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          resp.status(500).json("unable to delete");

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

var followuser = function followuser(req, resp) {
  var id, currentUserId, followingUser, followerUser;
  return regeneratorRuntime.async(function followuser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log("yyy");
          id = req.query.id;
          currentUserId = req.body.currentUserId;
          _context5.prev = 3;

          if (!(id === currentUserId)) {
            _context5.next = 8;
            break;
          }

          resp.json("action prohibited");
          _context5.next = 27;
          break;

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(Usermodal.findById(id));

        case 10:
          followingUser = _context5.sent;
          _context5.next = 13;
          return regeneratorRuntime.awrap(Usermodal.findById(currentUserId));

        case 13:
          followerUser = _context5.sent;

          if (followingUser.followers.includes(currentUserId)) {
            _context5.next = 22;
            break;
          }

          _context5.next = 17;
          return regeneratorRuntime.awrap(followingUser.updateOne({
            $push: {
              followers: currentUserId
            }
          }));

        case 17:
          _context5.next = 19;
          return regeneratorRuntime.awrap(followerUser.updateOne({
            $push: {
              following: id
            }
          }));

        case 19:
          resp.json({
            already: false,
            meaasge: "follow successfully"
          });
          _context5.next = 27;
          break;

        case 22:
          _context5.next = 24;
          return regeneratorRuntime.awrap(followingUser.updateOne({
            $pull: {
              followers: currentUserId
            }
          }));

        case 24:
          _context5.next = 26;
          return regeneratorRuntime.awrap(followerUser.updateOne({
            $pull: {
              following: id
            }
          }));

        case 26:
          resp.json({
            already: true,
            message: "unfollow successfull"
          });

        case 27:
          _context5.next = 32;
          break;

        case 29:
          _context5.prev = 29;
          _context5.t0 = _context5["catch"](3);
          resp.json('backend pro');

        case 32:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 29]]);
};

var Unfollowuser = function Unfollowuser(req, resp) {
  var id, currentUserId, followingUser, followerUser;
  return regeneratorRuntime.async(function Unfollowuser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log("yyy");
          id = req.query.id;
          currentUserId = req.body.currentUserId;
          _context6.prev = 3;

          if (!(id === currentUserId)) {
            _context6.next = 8;
            break;
          }

          resp.json("action prohibited");
          _context6.next = 23;
          break;

        case 8:
          _context6.next = 10;
          return regeneratorRuntime.awrap(Usermodal.findById(id));

        case 10:
          followingUser = _context6.sent;
          _context6.next = 13;
          return regeneratorRuntime.awrap(Usermodal.findById(currentUserId));

        case 13:
          followerUser = _context6.sent;

          if (!followingUser.followers.includes(currentUserId)) {
            _context6.next = 22;
            break;
          }

          _context6.next = 17;
          return regeneratorRuntime.awrap(followingUser.updateOne({
            $pull: {
              followers: currentUserId
            }
          }));

        case 17:
          _context6.next = 19;
          return regeneratorRuntime.awrap(followerUser.updateOne({
            $pull: {
              following: id
            }
          }));

        case 19:
          resp.json("succees unfollow");
          _context6.next = 23;
          break;

        case 22:
          resp.json("already unfollow");

        case 23:
          _context6.next = 28;
          break;

        case 25:
          _context6.prev = 25;
          _context6.t0 = _context6["catch"](3);
          resp.json('backend pro');

        case 28:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[3, 25]]);
};

var famous = function famous(req, resp) {
  var response;
  return regeneratorRuntime.async(function famous$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Usermodal.find({
            followers: {
              $gt: followers.length > 5
            }
          }));

        case 2:
          response = _context7.sent;
          console.log(response);
          resp.json(response);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
};

module.exports = {
  getUser: getUser,
  updateuser: updateuser,
  deleteUser: deleteUser,
  followuser: followuser,
  Unfollowuser: Unfollowuser,
  getAlluser: getAlluser,
  famous: famous
};