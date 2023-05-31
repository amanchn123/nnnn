"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../PostController'),
    CreatePost = _require.CreatePost,
    getPost = _require.getPost,
    updatePost = _require.updatePost,
    deletePost = _require.deletePost,
    LikePost = _require.LikePost,
    timeLinePost = _require.timeLinePost,
    Createstories = _require.Createstories,
    currentUserstory = _require.currentUserstory,
    storyTimeline = _require.storyTimeline;

var verify = require('../JWT_verification');

router.post('/newPost', verify, CreatePost);
router.put('/likes/', verify, LikePost);
router.get('/getpost', getPost);
router.put('/updatepost', updatePost);
router.post('/deletepost', verify, deletePost);
router.get('/timelinePost', verify, timeLinePost);
router.post('/createStory', Createstories);
router.get('/getmystory', currentUserstory);
router.get('/stories', storyTimeline);
module.exports = router;