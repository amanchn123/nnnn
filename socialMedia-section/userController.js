const Usermodal =require('./modals/AuthModal')
const bcrypt=require('bcrypt')



const getUser=(async(req,resp)=>{
    const ids=await req.body.id;


   try{
    const response=await Usermodal.find({ _id: { $in: ids } })
     
      console.log('Retrieved documents:', response);
      resp.json(response)
      // client.close();
    ;

   }catch (error){
    console.log('nahiiii')
     resp.status(500).json(error)
   }
})


const getAlluser=(async(req,resp)=>{
  try{
    const result=await Usermodal.find({}).select("-password")

    resp.status(200).json({result,success:true})
  }catch (error){
    resp.status(500).json({success:false})
  }
})



const updateuser=async(req,resp)=>{
  const {id}=req.query;
  const {currentUser,adminStatus,password,profilePic}=req.body;
  console.log(req.body)
  if(currentUser===id || adminStatus){
    try{
     
      if(password){
         const salt=await bcrypt.genSalt(10);
         req.body.password=await bcrypt.hash(password,salt)
      }

      const response=await Usermodal.findByIdAndUpdate(id,req.body,{new:true})
      resp.status(200).json({response,success:true})
     }catch (error){
        resp.status(500).json(error)
    }
  }else{
    resp.json("excess denied")
  }
}


const deleteUser=async(req,resp)=>{
  const {id}=req.query;

  try{
    const {currentUser,adminStatus,password}=req.body;
    if(currentUser==id || adminStatus){
      const response=await Usermodal.findByIdAndDelete(id)
      resp.status(200).json("deleted succesfully")
    }
    
  }catch (error){
    resp.status(500).json("unable to delete")
  }
}



const followuser=async(req,resp)=>{
  console.log("yyy")
  const {id}=req.query;
  const {currentUserId}=req.body;

  
try{
  if(id===currentUserId){
    resp.json("action prohibited")
  }
   else{
     const followingUser=await Usermodal.findById(id);
     const followerUser=await Usermodal.findById(currentUserId);

     if(!followingUser.followers.includes(currentUserId)){
        await followingUser.updateOne({$push:{followers:currentUserId}})
        await followerUser.updateOne({$push :{following:id}})

        resp.json({already:false,meaasge:"follow successfully"})
     }else{
      await followingUser.updateOne({$pull:{followers:currentUserId}})
        await followerUser.updateOne({$pull :{following:id}})

      resp.json({already:true,message:"unfollow successfull"})
     }
      
   }
}catch{
    resp.json('backend pro')
}
}

const Unfollowuser=async(req,resp)=>{
  console.log("yyy")
  const {id}=req.query;
  const {currentUserId}=req.body;

  
try{
  if(id===currentUserId){
    resp.json("action prohibited")
  }
   else{
     const followingUser=await Usermodal.findById(id);
     const followerUser=await Usermodal.findById(currentUserId);

     if(followingUser.followers.includes(currentUserId)){
        await followingUser.updateOne({$pull:{followers:currentUserId}})
        await followerUser.updateOne({$pull :{following:id}})

        resp.json("succees unfollow")
     }else{
      resp.json("already unfollow")
     }
      
   }
}catch{
    resp.json('backend pro')
}
}

const famous=async(req,resp)=>{
  const response=await Usermodal.find({followers:{$gt:followers.length>5}})
  console.log(response)
  resp.json(response)
}



module.exports={getUser,updateuser,deleteUser,followuser,Unfollowuser,getAlluser,famous};