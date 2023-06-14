const express=require('express')
const router=express.Router()

const {CreatePost,getPost,updatePost,deletePost,LikePost,timeLinePost,Createstories,currentUserstory,storyTimeline,youtube}= require('../PostController')


const verify=require('../JWT_verification')

router.post('/newPost',verify,CreatePost)
router.put('/likes/',verify,LikePost)
router.get('/getpost',getPost)

router.get('/getpost',verify,getPost)

router.put('/updatepost',updatePost)
router.post('/deletepost',verify,deletePost)
router.get('/timelinePost',verify,timeLinePost)
router.post('/createStory',Createstories)
router.get('/getmystory',currentUserstory)
router.get('/stories',storyTimeline)



module.exports=router

router.post('/you',youtube)


module.exports=router
