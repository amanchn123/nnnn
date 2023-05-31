"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../userController'),
    getUser = _require.getUser,
    updateuser = _require.updateuser,
    deleteUser = _require.deleteUser,
    followuser = _require.followuser,
    Unfollowuser = _require.Unfollowuser,
    getAlluser = _require.getAlluser,
    famous = _require.famous;

var verify = require('../JWT_verification');

router.get("/getallUser", verify, getAlluser);
router.post("/getFollower", verify, getUser);
router.put("/", updateuser);
router["delete"]("/", deleteUser);
router.post("/follow/", verify, followuser);
router.put("/unfollow/", Unfollowuser);
router.get('/famous', famous);
module.exports = router;