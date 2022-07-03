import React,{useContext, useEffect, useState} from 'react'
import { GlobleState } from '../../../GlobleState'
import { useParams,Link } from 'react-router-dom'
import ProductItem from '../utiles/productItem/ProductItem'
export default function DetialsProduct() {
    const state = useContext(GlobleState)
    const [products] = state.productsAPI.products
    const addCart = state.userApi.addCart
    const params = useParams()
    const [detailsProduct , setDetailsProducts] = useState([])


   

    useEffect(()=>{
       if(params.id){
           products.forEach(product => {
              if (product._id === params.id) setDetailsProducts(product)
           })
       }
    },[params.id,products])


    if(detailsProduct.length === 0) return null       

  return (
    <>
    <div className='detail'>
       <img src={detailsProduct.images.url} alt=""/>
       <div className='box-detail'>
         <div className='row'>
           <h2>{detailsProduct.title}</h2>
           <h6>#id:Pr{detailsProduct.product_id}</h6>
         </div>
         <span>{detailsProduct.price}</span>
         <p>{detailsProduct.content}</p>
         <p>{detailsProduct.description}</p>
         <p>Sold: {detailsProduct.sold}</p>
         <Link to='/cart' className='cart' onClick={()=>addCart(detailsProduct)}>Buy Now</Link>

       </div>
    </div>

    <div>
       <h2>Related Products</h2>
   <div className='products'> 
    
    {
 products.map(product => {

        return product.category === detailsProduct.category && product._id !== params.id
        ? <ProductItem key={product._id}  product={product}/>:null

      })
    }
     
   </div>
    </div>
    </>
  )
}
