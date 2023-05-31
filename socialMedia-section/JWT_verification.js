const jwt=require('jsonwebtoken')

const verify=async(req,resp,next)=>{
    const recToken=req.headers.authorization;
    try{
        jwt.verify(recToken,process.env.SECRET_KEY,(err,valid)=>{
          if(err){
            console.log("unabe to verify jwt token")
          }else if(valid){
            // resp.json({verify:true})
            next()
          }
        })
    }catch{

       console.log("backend error")
    }

}

module.exports=verify