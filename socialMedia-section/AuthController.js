const Usermodal=require('./modals/AuthModal')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const registeruser=async(req,resp)=>{
  console.log("royy")
   const{username,password,firstName,lastName}=req.body;

   const alreadyExist=await Usermodal.findOne({username:username})

   if(alreadyExist){
    resp.json("user already exist")

   }else{
    const salt=await bcrypt.genSalt(10)
    const secure_password=await bcrypt.hash(password,salt)
    const response=await Usermodal.create({username,password:secure_password,firstName,lastName})
      
     try{
       const result=await response.save()
       
       const token=jwt.sign({
        username:response.username, id:response._id
       },process.env.SECRET_KEY,{expiresIn:'1h'})
   

       resp.status(200).json({result,success:true,token})
     }catch (error){
       console.log("badd")
         resp.status(500).json({error,success:false})
     }
   }

}

const loginUser=async(req,resp)=>{
  const {username,password}=req.body
  try{
    const response=await Usermodal.findOne({username:username})
    if(response){
      const verifyPassword=await bcrypt.compare(password,response.password)
      if(verifyPassword){
        const token=jwt.sign({
          username:response.username, id:response._id
         },process.env.SECRET_KEY)
  
        resp.json({response,success:true,token})
      }else{
        resp.json({success:false})
      }
    }else{
      resp.json({success:false})
    }
  }catch (error){
     resp.status(500).json({success:false})
  }

}

const checkuserLogin =async(req,resp)=>{
    resp.json({verification:true})
}

module.exports={registeruser,loginUser,checkuserLogin}
