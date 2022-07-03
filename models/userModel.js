const  mongoose  = require("mongoose")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true
       
    },
    role:{
        type:Number,
        default:0
    },
    cart:{
       type:Array,
        default:[]
       
    }
},{
    timestamps:true
})
const User = mongoose.model("Users",userSchema)
module.exports = User