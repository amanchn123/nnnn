const mongoose=require('mongoose')

const storySchema=mongoose.Schema({
    likes:[],
    story:String,
    userId:{type:String,require:true},
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timestamp.getSeconds(),
      },
     
},{
    timeStamps:true
})

const storyModel=mongoose.model("story",storySchema)

module.exports=storyModel
