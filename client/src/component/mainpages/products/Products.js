import React,{useContext, useEffect, useState} from 'react';
import {GlobleState} from '../../../GlobleState'
import ProductItem from '../utiles/productItem/ProductItem'
import Loading from '../utiles/loading/Loading';
import Filters from './Filters';
import LoadMore from './LoadMore';
import axios from 'axios';


export default function Products() {
  const state = useContext(GlobleState)
  const [products,setProducts] = state.productsAPI.products 
  const [isAdmin] = state.userApi.isAdmin
  const [callback,setCallback] = state.productsAPI.callback
  const [token] = state.token
  const [loading,setLoading] = useState(false)
  const [isAllChecked,setIsAllChecked] = useState(false)
  

 useEffect(()=>{
   document.title = 'Shop'
 })
 const deleteProduct = async (id,public_id) =>{
  try {
    setLoading(true)
    const deleteImage = axios.post("/api/destroy",{public_id},{
      headers:{Authorization:token}
    })
    const deleteProductData = axios.delete(`/api/product/${id}`,{
     
      headers:{Authorization:token}
    })
    await deleteImage
    await deleteProductData
    setCallback(!callback)
    setLoading(false)
    
  } catch (err) {
    alert(err.response.data.msg)
  }
}
const handleChange = (id) =>{
  products.forEach(product =>{
     if(product._id === id) product.cheked = !product.cheked
  })
  setProducts([...products])
}
const handleAllCheck = () => {
 
  products.forEach(product => {
   product.cheked = !isAllChecked
  })
  setProducts([...products])
  setIsAllChecked(!isAllChecked)
}

const deleteAll = () => {
  products.forEach(product => {
    if(product.cheked) deleteProduct(product._id,product.images.public_id)
  })
}
  if(loading) return <div className='products'><Loading/></div>
  return (
    <>
    <Filters/>
    {
      
      isAdmin && <div className='delete-all'>
        <span>Select All</span>
        <input type='checkbox' checked={isAllChecked} onChange={handleAllCheck}/>
        <button onClick={deleteAll}>{isAllChecked?'Delete All':"Delete Select Item"}</button>
      </div>
    }
    <div className='products'>
    {
      products.map((product)=>{  
        return(
          <ProductItem key={product._id} product={product} isAdmin={isAdmin} deleteProduct={deleteProduct} handleChange={handleChange}/>
        )     
      }) 
    }
  <LoadMore/>
 </div>
   <div className='productPageLoader'>
   {
     products.length === 0 && <Loading/>
  }
   </div>
   
 </>
  )
 
}   
