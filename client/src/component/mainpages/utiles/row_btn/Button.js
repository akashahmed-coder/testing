import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { GlobleState } from '../../../../GlobleState'
export default function Button({product,deleteProduct}) {
  const state = useContext(GlobleState)
  const [isAdmin] = state.userApi.isAdmin
  const addCart = state.userApi.addCart
  return (
<div className='row_btn'>
  {isAdmin?
  <>
  <Link to="#!" id='btn_buy' onClick={()=>deleteProduct(product._id,product.images.public_id)}>delete</Link>
    <Link  to={`/edit_product/${product._id}`} id='btn_view'>edit</Link>
  </>
  :
  <>
  <Link to="#!" id='btn_buy' onClick={()=>addCart(product)}>Buy</Link>
    <Link  to={`/details/${product._id}`} id='btn_view'>View</Link>
  </>
  }
    
</div>
  )
}
