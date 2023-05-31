const express=require('express')
const con=require('./connection')
const cors=require('cors')
const dotenv=require('dotenv')
// const usernotfound=require('./CHATTING-section/errorHandling/apinotfound')
const register=require('./socialMedia-section/routes/AuthRoute.js')
const verify =require('./socialMedia-section/JWT_verification')
const app=express()
const path=require('path')
dotenv.config()
con()
app.use(cors({origin:"*"}))

app.use(express.json())
app.use(express.static(path.join(__dirname,'./client/build')))

app.get("*",(req,resp)=>{
    resp.sendFile(path.join('.client//build/index.html'))
})


// app.use('/api',require('./CHATTING-section/useroutes/userRoute'))
app.use('/apii',require('./socialMedia-section/routes/userRoutes'))
app.use('/apii',register)

app.use('/apii',require('./socialMedia-section/routes/postRoutes'))

app.use('/you',require('./socialMedia-section/routes/you'))
app.listen(5000,console.log('running succesfully'))