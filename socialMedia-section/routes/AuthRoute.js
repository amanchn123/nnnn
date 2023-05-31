const express=require('express')
const router=express.Router()
const {registeruser, loginUser,checkuserLogin}=require('../AuthController')
const verify=require('../JWT_verification')


router.post('/registeruser',registeruser)
router.post('/loginuser',loginUser)
// router.post('/loginLogout',verify,checkuserLogin)
router.get('/loginLogout',verify,checkuserLogin)
module.exports=router