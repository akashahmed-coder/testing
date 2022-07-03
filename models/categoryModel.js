const mongoose = require('mongoose')
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
module.exports = Category