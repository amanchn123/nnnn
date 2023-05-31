const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    userId:String,
    desc:String,
    // duration: durationInMinutes,
    likes:[],
    image:String,
    username:String,
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timestamp.getSeconds(),
      },
    
},{
    timeStamps:true
})

const PostModel=mongoose.model("Post",postSchema)
module.exports=PostModel;