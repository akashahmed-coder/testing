import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobleState } from '../../../GlobleState'
export default function DetailsHistory() {

const state = useContext(GlobleState)
const [history] = state.userApi.history
const [detailsHistory,setDetailsHistory] = useState([])
const params = useParams()

useEffect(()=>{
   if(params.id){
       history.forEach(item=>{
           if(item._id === params.id) setDetailsHistory(item)
       })
   }
},[params.id,history])


if(detailsHistory.length === 0) return null
  return (
    <div className='history-page'>
       <table>
             <thead>
                 <tr>
                 <th>Name</th>
                 <th>Address</th>
                 <th>Postal Code</th>
                 <th>Country Code</th>
                 </tr>
             </thead>
             <tbody>
                <tr>
                    <td>{detailsHistory.address.recipient_name}</td>
                    <td>{detailsHistory.address.city + " - " +detailsHistory.address.line1}</td>
                    <td>{detailsHistory.address.postal_code}</td>
                    <td>{detailsHistory.address.country_code}</td>
                </tr>
             </tbody>
         </table>

         <table style={{margin:"30px 0px"}}>
             <thead>
                 <tr>
                 <th></th>
                 <th>Products</th>
                 <th>quantity</th>
                 <th>Price</th>
                 </tr>
             </thead>
             <tbody>
               {
                   detailsHistory.cart.map(item=>{
                       return(
                        <tr key={item._id}>
                        <td>{<img src={item.images.url} alt="product"/>}</td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                    </tr>
                       )
                   })
               }
             </tbody>
         </table>
    </div>

  )
}
