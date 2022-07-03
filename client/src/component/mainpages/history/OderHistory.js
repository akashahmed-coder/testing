import React,{useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { GlobleState } from '../../../GlobleState'
import axios from 'axios'


export default function OderHistory() {
    const state = useContext(GlobleState)
    const [history,setHistory] = state.userApi.history
    const [isAdmin] = state.userApi.isAdmin
    const [token] = state.token
    


    useEffect(()=>{
        if(token){
          const getHistory = async () => {
             
                 if(isAdmin){
                    const res = await axios.get("/api/payment",{
                        headers:{Authorization:token}
                    })
                    setHistory(res.data)
                  
                 }else{
                    const res = await axios.get("/user/history",{
                        headers:{Authorization:token}
                    })
                    setHistory(res.data.history)
                 }
              
          }
          getHistory()
        }
    },[token,isAdmin,setHistory])
  return (
    <div className='history-page'>
         <h2>History</h2>
         <h4>you have {history.length} odered</h4>
         <table>
             <thead>
                 <tr>
                 {
                     isAdmin?<th>Client</th>:null
                 }
                 <th>PaymentID</th>
                 <th>Date of Purchased</th>
                 <th>Status</th>
                 <th></th>
               
                 </tr>
             </thead>
             <tbody>
                 {
                     history.map(item => {
                         return(
                             <tr>
                                  {
                                      isAdmin?<td>{item.name}</td>:null
                                  }
                                 <td>{item.paymentID}</td>
                                 <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                 <td>{item.status} {isAdmin?<Link to={`/status/${item._id}`}>Edit</Link>:null}</td>
                                 <td><Link to={`/history/${item._id}`}>view</Link></td>
                             </tr>
                         )
                     })
                 }
             </tbody>
         </table>
        
    </div>
  )
}

