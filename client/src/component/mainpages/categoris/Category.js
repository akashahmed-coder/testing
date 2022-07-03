import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobleState } from '../../../GlobleState'
export default function Category() {
const state = useContext(GlobleState)
const [token] = state.token
const [callback,setCallback] = state.categoryApi.callback
const [categories] = state.categoryApi.category
const [category,setCategory] = useState('')
const [id,setId] = useState('')
const [onEdit,setOnEdit] = useState(false)




const createCategory = async (e) => {
  e.preventDefault();
  try {
   if(onEdit){
    const res = await axios.put(`/api/category/${id}`,{name:category.toLowerCase()},{
      headers:{Authorization:token}
      
    })
    alert(res.data.msg)
    
   }else{
    const res = await axios.post("/api/category",{name:category.toLowerCase()},{
      headers:{Authorization:token}
    })
    alert(res.data.msg)
   
   }
   setId('')
   setCategory('')
   setCallback(!callback)
  } catch (err) {
    alert(err.response.data.msg)
  }
}
const EditCategory = (name,id) =>{
  setId(id)
  setOnEdit(true)
  setCategory(name)
}
const DeleteCategory = async(id) =>{
  try{
const res = await axios.delete(`/api/category/${id}`,{
  headers:{Authorization:token}
})
  
   setCallback(!callback)
   alert(res.data.msg)
  }catch(err){
    alert(err.response.data.msg)
  }
}
  return (
    <div className='categories'>
      <form onSubmit={createCategory}>
        <label htmlFor='category'>Category</label>
        <input type='text' name="categoty" value={category}
        onChange={ e =>setCategory(e.target.value)}  />
        <button type='submit'>{onEdit?"Updata":"Save"}</button>
      </form>

      <div className='col'>
        {
          categories.map(category =>(
            <div className='row' key={category._id}>
              <p>{category.name}</p>
              <div>
                <button onClick={()=>EditCategory(category.name,category._id)}>Edit</button>
                <button onClick={()=>DeleteCategory(category._id)}>Delete</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}
