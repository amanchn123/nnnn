const mongoose=require('mongoose')

const User_schema=mongoose.Schema({
    username:{
        type:String,
        // require:true
    },
    password:{
        type:String,
        // require:true
    },
    firstName:{
        type:String,
        // require:true
    },
    lastName:{
        type:String,
        // require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePic:{type:String,default:'https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o='},
    coverPic:String,
    about:String,
    livesin:String,
    worksAt:String,
    relaship:String,
    followers:[],
    following:[]
},{timestamps:true}
 )

const Usermodal=mongoose.model("social_users",User_schema)
module.exports=Usermodal

