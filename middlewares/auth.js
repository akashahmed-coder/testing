const jwt = require('jsonwebtoken')

const auth = (req,res,next) =>{
    const token = req.header("Authorization")
    if(!token)return res.status(400).json({msg:"Invalid Authentication"})

    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err)return res.status(400).json({msg:"Invalid Authentication"})
        req.user = user
        next();
    })
}

module.exports = auth