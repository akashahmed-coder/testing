const User = require('../models/userModel')
const Payment = require("../models/paymentModel")
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const { findOneAndUpdate } = require('../models/userModel')
const userCtrl = {
    register: async(req,res)=>{
        try{
           const {name,email,password} = req.body
          const user = await User.findOne({email})
          if(user){
            return  res.status(400).json({msg:"this email has already present"})
          }
     if(password.length < 6){
          return  res.status(400).json({msg:"password needed atlest 6 charactor"})
            
          }
          const passwordHash = await bycrpt.hash(password,10)
          const newUser = new User({name,email,password:passwordHash})
          await newUser.save()
          const refreshToken = createRefreshToken({id: newUser.id})
          res.cookie('refreshToken',refreshToken,{
              httpOnly:true,
              path:"/user/refresh_token",
              maxAge: 7*24*60*60*1000
     
          })
          res.send("registration success")
          
        }catch(err){
         res.json(err.message)
        }
    
    },
    login: async(req,res)=>{
     try{
        const {email,password} = req.body
        const user = await User.findOne({email})
   
        if(!user){
          return  res.status(400).json({msg:"user dosenot exist"})
        }
      
        const isMatch = await bycrpt.compare(password,user.password)
   
        if(!isMatch){
            return  res.status(400).json({msg:"password doesnot match"})
        }
           
        const accessToken = createAccessToken({id: user.id})
        const refreshToken = createRefreshToken({id: user.id})
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            path:"/user/refresh_token",
            maxAge: 7*24*60*60*1000
   
        })
        res.json({accessToken})
     
     }catch(err){
        res.status(500).Json(err.message)
     }

    },
    logout: async(req,res) =>{
      try{
    res.clearCookie('refreshToken',{path:"/user/refresh_token"})
    res.status(201).json({msg:"logged out"})
      }catch(err){
        res.status(500).send(err.message)
      }
    },
    refresh_token: (req,res)=>{
       try{
        const rf_token = req.cookies.refreshToken
        if(!rf_token){
            return  res.status(400).json({err:"please Login or Register"})
        }
       jwt.verify(rf_token,process.env.REFRESS_TOKEN,(err,user)=>{
             if(err){
              return  res.status(400).json({err:"please Login or Register"})
             }
            const accessToken = createAccessToken({id: user.id})
            res.json({accessToken})
         })
       }catch(err){
           res.status(500).send(err.message)
       }

        
    },
    getUser: async (req,res) =>{
     try {
       const user = await User.findById(req.user.id).select("-password")
       if(!user) return res.status(400).json({msg:"User Does Not Exist"})
       res.json(user)
     } catch (err) {
       res.status(500).json({msg:err.message})
     }
    },
    addCart: async (req,res) =>{
      try {
        const user = await User.findById(req.user.id) 
      if(!user){
        return res.status(400).json({msg:"user doesnot exist"})
      }
      await User.findOneAndUpdate({_id:req.user.id},{cart:req.body.cart})
      res.json({msg:"cart is added"})
      } catch (err) {
       res.status(500).json({msg:err.message})
        
      }
    },
    history: async (req,res) => {
      try {
        const history = await Payment.find({user_id:req.user.id})
        res.json({history})
      } catch (err) {
        res.status(500).send(err.message)
      }
    }
}

const createAccessToken = (user) =>{
 const token =  jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'1d'})
 return(token)
}

const createRefreshToken = (user) =>{
    const token =  jwt.sign(user,process.env.REFRESS_TOKEN,{expiresIn:'7d'})
    return(token)
   }

module.exports = userCtrl
 