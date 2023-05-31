const express=require('express')
const router=express.Router()
const {getUser,updateuser,deleteUser,followuser,Unfollowuser,getAlluser,famous}=require('../userController')
const verify=require('../JWT_verification')

router.get("/getallUser",verify,getAlluser)
router.post("/getFollower",verify,getUser)
router.post("/updateprofile",updateuser)
router.delete("/",deleteUser)
router.post("/follow/",verify,followuser)
router.put("/unfollow/",Unfollowuser)
router.get('/famous',famous)

module.exports=router;
