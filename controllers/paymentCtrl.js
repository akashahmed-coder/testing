const Payment = require('../models/paymentModel')
const User = require('../models/userModel')
const Product = require('../models/productsModel')

const paymentCtrl ={
    getPayment: async (req,res) => {
        try {
            const payment = await Payment.find()
            res.json(payment)
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    },
    createPayment: async (req,res) => {
        try {
        const user = await User.findById({_id:req.user.id}).select('name email')
        if(!user){
            res.status(400).json({msg:"user does not exist"})
        }
        const {cart,paymentID,address} = req.body
        const {_id,name,email} = user
        const newPayment = new Payment({
            user_id:_id , name ,email ,cart,paymentID,address
        })
        cart.filter(item=>{
            return sold(item._id , item.quantity , item.sold)
        })
        await newPayment.save()
        res.json({newPayment})
        } catch (err) {
            res.status(500).json({msg:err.message})
            
        }
    },
    updateStatus: async (req,res) =>{
        try {
            const {status} = req.body
           await Payment.findByIdAndUpdate({_id:req.params.id} , {status})
           res.json({msg:"status Update"})


        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    }
}

const sold = async (id,quantity,oldSold) => {
   await Product.findOneAndUpdate({_id:id},{
       sold: oldSold + quantity
   })
}

module.exports = paymentCtrl 