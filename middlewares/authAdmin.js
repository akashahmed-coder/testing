const User = require('../models/userModel')

const authAdmin = async (req,res,next)=>{
   try{
    
    const user =  await User.findById({_id: req.user.id})  
    
    if(user.role === 0) return res.status(500).json({msg:"admin resouces access denied"})
    next();
   }catch(err){
       res.status(500).json(err.message)
   }

    // /////
    // fasfawdsf


}

module.exports = authAdmin