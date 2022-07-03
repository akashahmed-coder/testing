const router = require('express').Router()
const cloudinary = require('cloudinary')
const req = require('express/lib/request')
const fs = require('fs')
const auth = require('../middlewares/auth')
const authAdmin =require('../middlewares/authAdmin')

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

 router.post("/upload",auth,authAdmin,(req,res)=>{
  try{
    if(!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({msg:"no file were uploaded"})
     }
  
     const file = req.files.file 
     if(file.size === 1024*1024){
       removeTmp(file.tempFilePath)
      return res.status(400).json({msg:"file size too large"})
     } 

     if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png'&& file.mimetype !== 'image/webp'   ){
      removeTmp(file.tempFilePath)
       return res.status(400).json({msg:"file formate is incorrect"})
     }
     cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"ecommers"},async(err,result)=>{
       if(err){
         throw err
       }
       res.json({public_id:result.public_id,url:result.url})
     })
    
  }catch(err){
    res.status(500).json(err.message)
  }
 })
 router.post("/destroy",auth,authAdmin,(req,res)=>{
  try{
    const {public_id} = req.body
    if(!public_id) return req.status(400).json({msg:"no image selected"})

    cloudinary.v2.uploader.destroy(public_id,err=>{
      if(err){throw err}
   
      res.status(200).json({msg:"image is delete"})
    })
  
  }catch(err){
    res.status(500).json(err.message)
  }
 })

 const removeTmp = (path)=>{
    fs.unlink(path ,err=>{
      if(err){
        throw err
      }
    })
 }

 module.exports = router