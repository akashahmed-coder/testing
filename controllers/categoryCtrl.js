const Category = require('../models/categoryModel')

const categoryCtrl = {
   getCategory: async (req,res)=>{
      try{
       
        const category = await Category.find()
        res.json(category)
      }catch(err){
          res.status(500).json(err.message)
      }
   },
   createCategory:async(req,res)=>{
     try{
      const {name} = req.body
      if(!name) return res.status(400).json({msg:"please type a category name"})
      const category = await Category.findOne({name})
      if(category) return  res.status(400).json({msg:"category is already created"})
      const newCategory = await new Category({
        name
      }).save()
      if(newCategory) return  res.status(200).json({msg:"category is created"}) 
     }catch(err){
       res.status(500).json(err.message)
     }
   },
   deleteCategory:async(req,res)=>{
    try{
    await Category.findByIdAndDelete({_id:req.params.id})
     res.status(200).json({msg:"catrgory is deleted" })
    }catch(err){
 res.status(500).json(err.message)
    }
   },
    updateCategory:async(req,res)=>{
    try{
     const {name} = req.body
      if(!name) return res.status(400).json({msg:"please type a category name"})

    const category = await Category.findOne({name})
    if(category) return  res.status(400).json({msg:"category is already created"})

    await Category.findByIdAndUpdate({_id:req.params.id},{name})
    res.json({msg:"update success"})
    
    }catch(err){
 res.status(500).json(err.message)
    }
   }

}

module.exports = categoryCtrl