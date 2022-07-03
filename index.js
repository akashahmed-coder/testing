require('dotenv').config()
const express = require('express')
const app = express()
const router = require('express').Router()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')


app.use(router)
//connect to mongodb database
const URI = process.env.MONGODB_DATABASE
mongoose.connect(URI,{
    // useCreateIndex:true,
    // useFindAndModify:false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("database connection successfull")
}).catch((err)=>{
    console.log(err)
})

const categorySchema = new mongoose.Schema({
    name:{


        type:String,
        require:true,
        trim:true,
        unique:true


    }
},{
    timestamps:true
})

const Category = mongoose.model("Category",categorySchema)


router.get("/",(req,res)=>{
    res.json({msg:"hellow"})
})

router.get("/api/category",async(req,res)=>{
    try{
        const category = await Category.find()
         res.json(category)
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

app.listen(PORT,()=>{
    console.log("server is running successfull " + PORT)
})


