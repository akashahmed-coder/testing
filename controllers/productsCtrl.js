
const Products = require('../models/productsModel')

class APIfeatures {
   constructor(query,queryString){
      this.query =  query
      this.queryString = queryString
   }
   filtering(){
 const queryObj = {...this.queryString}
 const excludedFields = ['page','sort','limit']
 excludedFields.forEach(el=> delete(queryObj[el]))
 let querySt = JSON.stringify(queryObj)
 querySt = querySt.replace(/\b(gte|gt|lt|lte|regex)\b/g , match => '$'+ match)
 this.query.find(JSON.parse(querySt))
 return this;

   }
   sorting(){
      if(this.queryString.sort){
         
         const sortBy = this.queryString.sort.split(',').join('')
        
         this.qurey = this.query.sort(sortBy)
      }else{
         this.query.sort("-createdAt")
      }
      return this;
   }
   paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 9
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit)
      return this;
   }
}
const productsCtrl = {
    getProduct:async(req,res)=>{
     try {
        const feature = new APIfeatures(Products.find(),req.query)
        .filtering().sorting().paginating()
        const product = await feature.query
      // const getProduct = await Products.find().select(["title","price","product_id"]).limit().sort({product_id:-1})
   
        res.json({
           status:"success",
           result:product.length,
           product:product
        })
     } catch (err) {
         res.status(400).json(err.msg)
     }
    },
    createProduct:async(req,res)=>{
     try {
        const {product_id,title,price,description,content,images,category} = req.body
        if(!images)return res.status(400).json({msg:"please upload a photo"})
 
        const product = await Products.findOne({product_id})
        if(product)return res.status(400).json({msg:"this product is already present"})
        const newProduct = new Products({
         product_id,title:title.toLowerCase(),price,description,content,images,category
        })
        await newProduct.save()
        res.json({msg:"product is create"})
     } catch (err) {
        res.status(500).json(err.message)
         
     }

    },
    updateProduct:async(req,res)=>{
        try {
         const {title,price,description,content,images,category} = req.body
         if(!images){
            return res.status(400).json({msg:"no image upload"})
         }
        await Products.findByIdAndUpdate(req.params.id,{
            title,price,description,content,images,category
         })
         return res.json({msg:"update successfull"})
        } catch (err) {
        res.status(500).json(err.message)
           
        }
    },
    deleteProduct:async(req,res)=>{
       try {
        await Products.findByIdAndDelete(req.params.id)
        res.json({msg:"delete this product success"})
       } catch (err) {
           res.status(500).json(err.message)
       }
    }
    
    

}

module.exports = productsCtrl