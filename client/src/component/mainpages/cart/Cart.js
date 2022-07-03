import React, { useContext,useEffect,useState } from 'react';
import { GlobleState } from '../../../GlobleState';
import axios from 'axios';
import PaypalButton from './PaypalButton'
export default function Cart() {
  const state = useContext(GlobleState)
  const [cart,setCart] = state.userApi.cart
  const [total,settotal] = useState(0)
  const [token] = state.token


 
 
 useEffect(()=>{
    const getTotal = () => {

      const total = cart.reduce((prev, item)=>{
        return prev + (item.price*item.quantity)
         },0)
         settotal(total)
    }
    getTotal()
    document.title = `Cart (${cart.length})`
 },[cart])
 const addCart = async (cart) => {
   console.log(cart)
  await axios.patch("/user/addcart",{cart},{
    headers:{Authorization:token}
  })
}
 const increment = (id) => {
    cart.forEach(item =>{
      if(item._id === id){
        item.quantity += 1
      }
      
    })
    setCart([...cart])
    addCart(cart)
 }
 const decrement = (id) => {
  cart.forEach(item =>{
    if(item._id === id){
      item.quantity === 1? item.quantity = 1 : item.quantity -= 1
    }
    
  })
  setCart([...cart])
  addCart(cart)
}
const removeProduct = (id) =>{
 cart.forEach((item, index)=>{
   if(item._id === id){
     cart.splice(index,1)
   }
 })
 setCart([...cart])
 addCart(cart)
}


 if(cart.length === 0){
  return <h1 style={{textAlign:"center",fontSize:"5rem"}}>Cart Empty</h1>
}
const tranSuccess = async (payment) => {

      const {paymentID,address} = payment
      await axios.post("/api/payment", {cart,paymentID ,address},{
        headers:{Authorization:token}
      })
      setCart([])
      addCart([])
      alert("you have successfully placed an order")

}
  return <div>
      {
        cart.map(product =>{
          return(
            
          <div className='detail cart' key={product._id}>
          <img src={product.images.url} alt="" />
          <div className='box-detail'>
              <h2>{product.title}</h2>
            <span>{product.price * product.quantity}</span>
            <p>{product.content}</p>
            <p>{product.description}</p>
           
           <div className='amount'>
             <button onClick={()=>decrement(product._id)}>-</button>
             <span>{product.quantity}</span>
             <button onClick={()=>increment(product._id)}>+</button>
           </div>
           <div className='delete' onClick={()=>removeProduct(product._id)}>✖</div>

         
   
          </div>
       </div>
          )
        })
        
      }
      <div className='total'>
          <h3>total: {total}</h3>
          <PaypalButton total={total} tranSuccess ={tranSuccess}/>
          </div>
  </div>
}
