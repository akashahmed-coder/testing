import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
export default function Status() {
    const state = useContext(GlobleState)
    const [token] = state.token
    const [status,setstatus] = useState('Processing')
    const params = useParams()
    console.log(status)

    const myFunction = (e) => {
        setstatus(e.target.value)
    }
    const handleStatus = async (e) => {
        e.preventDefault();
        try{
         const res = await axios.patch(`/api/payment/${params.id}`,{status:status},{
             headers:{Authorization:token}
         })
         alert(res.data.msg)
         window.location.href = "/history"
        }catch(err){
            alert(err.response.data.msg)
        }
    }

  return (
    <div>
    <form onSubmit={handleStatus}>
        <label>Choose a car:</label>
        <select name="cars"  onChange={myFunction}>
            <option value="Processing">Processing</option>
            <option value="Shiping">Shiping</option>
            <option value="Delivered">Delivered</option>
           
        </select>
        <br/>
        <input type="submit" value="Submit"/>
    </form>
    </div>
  )
}
