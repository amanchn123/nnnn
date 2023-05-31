const { default: mongoose } = require('mongoose');
const Usermodal = require('./modals/AuthModal');
const PostModel = require('./modals/PostModal');
const storyModel=require('./modals/storyModel')


const CreatePost=async(req,resp)=>{
   
    try{
        const newPost=await new PostModel(req.body)
       await newPost.save()
       resp.status(200).json(newPost)
    }catch{
    resp.status(500).json("unable to create")
    }
}

const getPost=async(req,resp)=>{
    try{
       const {userId}=await req.query

       const getpost=await PostModel.find({userId:userId}).sort({createdAt:-1})
       resp.status(200).json(getpost)   
     
    }catch{
        resp.status(500).json("unable to get post ")
    }
}


const updatePost=async(req,resp)=>{
    const {userId}=req.body
    const {id}=req.query
    try{
        const post=await PostModel.findById(id)  
      if(post.userId===userId){
        await post.updateOne({$set:req.body})
        await post.save()
        resp.status(200).json(post) 
      }

    }catch{
        resp.status(500).json("unable to update post")
    }
}



const deletePost=async(req,resp)=>{
    try{
        
        const {id}=req.body;
        
        const post=await PostModel.findByIdAndDelete({_id:id})
        
            console.log("gaaa")
            resp.status(200).json('deleted success')
    }catch{
        resp.status(500).json("unable to delete")
    }
}


const LikePost=async(req,resp)=>{
    const {id}=req.query;
    const {currentUserId}=req.body;
   console.log(id,currentUserId)

    try{
      const someOnespost=await PostModel.findByIdAndUpdate({_id:id} )
       console.log(someOnespost)
      if(!someOnespost.likes.includes(currentUserId)){
        console.log("ttt")
          await someOnespost.updateOne({$push:{likes:currentUserId}})
          
          resp.json('liked')
      }else{
          await someOnespost.updateOne({$pull:{likes:currentUserId}})
          resp.json('diliked')
      }
    }catch (error){
      console.log(error)
    }
}

const timeLinePost=async(req,resp)=>{
    const {userId}=await req.query;
    
    try{
        const currentUserPost=await PostModel.find({userId:userId}).sort({createdAt:-1})
         const followingPost=await Usermodal.aggregate([

            { 
                $match: {
                  _id: new mongoose.Types.ObjectId(userId),
                },
              },
              {
                $lookup: {
                  from: "posts",
                  localField: "following",
                  foreignField: "userId",
                  as: "followingPosts",
                },
              },
              {
                $project: {
                  followingPosts: 1,
                  _id: 0,
                },
              },
        
        ])

        resp.json(currentUserPost.concat(...followingPost[0].followingPosts))
    }catch{
      resp.json('unabale')
    }

}

const Createstories=async(req,resp)=>{
  const {userId,story}=req.body;
   
    try{

        const createStory=await new storyModel(
          req.body
           )
           
           const storyCreated=await createStory.save()
           resp.status(200).json(storyCreated)
        

  }catch (error){
    resp.status(500).json("unable to create post")
  }
  }

const currentUserstory=async(req,resp)=>{
  const {userId}=await req.body

  try{
       const getstory=await storyModel.find({userId:userId})
       resp.json(getstory)
  }catch (error){
     resp.json(error)
  }
} 


const storyTimeline=async(req,resp)=>{
  const {userId}=await req.query
  console.log(userId)

  try{
    const mystory=await storyModel.find({userId:userId})
      const stories=await Usermodal.aggregate([
        {$match:{_id:new mongoose.Types.ObjectId(userId)}},

        {$lookup:{
          from:"stories",
          localField:"following",
          foreignField:"userId",
          as:"followingStory"
        }},
        // { $group : { _id : "$userId" } },
        
        {$project:{
          followingStory:1
        }},
        
        
        
      ])
      
      resp.json({my:mystory,others:stories[0].followingStory})
  }catch{
    console.log("mystory")
    resp.json("unable to get")
    resp.json("unable to gets")

  }
}
 

     
module.exports={CreatePost,getPost,updatePost,deletePost,LikePost,timeLinePost,Createstories,currentUserstory,storyTimeline}