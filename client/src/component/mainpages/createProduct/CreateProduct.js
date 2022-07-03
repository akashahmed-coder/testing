import React, { useContext, useEffect, useState } from 'react'
import {useParams,useHistory} from 'react-router-dom'
import axios from 'axios'
import { GlobleState } from '../../../GlobleState'
import Loading from '../utiles/loading/Loading'

const initialState = {
  product_id: "",
  title:"",
  price:0,
  description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sdescription",
  content:"content",
  category:"",
  _id:''

}
export default function CreateProduct() {
  const state = useContext(GlobleState)
  const [category] = state.categoryApi.category
  const [callback,setCallback] = state.productsAPI.callback
  const [token] = state.token
  const [isAdmin] = state.userApi.isAdmin
  const [products] = state.productsAPI.products
  const [product,setProduct] = useState(initialState)
  const [images,setImages] = useState(false)
  const [loading,setLoading] = useState(false)
  const [onEdit,setOneEdit] = useState(false)
  const params = useParams()
  const history = useHistory()


  const handleFileChange = async(e) => {
    e.preventDefault();

    try {
      if(!isAdmin) return "you are not a admin"
      const file = e.target.files[0]
       if(file.size === 1024*1024){
        return alert("file size too large") 
       } 
  
       if(file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png'&& file.type !== 'image/webp'   ){
        return alert("file formate is incorrect")
       }
      let formData = new FormData()
      formData.append('file',file)
      setLoading(true)
      const res = await axios.post('/api/upload',formData,{
        headers:{'Content-Type':'multipart/form-data',Authorization:token}
      })
      setLoading(false)
      console.log(res)
      setImages(res.data)
      
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  const ClearImage = async() => {
    try {
      setLoading(true)
        await axios.post("/api/destroy",{public_id:images.public_id},{
        headers:{Authorization:token}
      })
      setLoading(false)
      setImages(false)
      
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  const handleInput = (e) => {
    const {name,value} = e.target
    setProduct({...product,[name]:value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(onEdit){
        await axios.put(`/api/product/${params.id}`,{...product,images},{
          headers:{Authorization:token}
        })
      }else{
          await axios.post("/api/product",{...product,images},{
          headers:{Authorization:token}
        })
      }
      
      setCallback(!callback)
      history.push('/')
 
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  useEffect(()=>{
    if(params.id){
        products.forEach(product => {
          if(product._id === params.id){
            setProduct(product)
            setImages(product.images)
            setOneEdit(true)
          }
        })
    }else{
          setProduct(initialState)
          setImages(false)
          setOneEdit(false)   
    }

  },[params.id,products])
  const styleUpload = {
    display: images?'block':'none'
  }

  return (
    <div className='create_product'>
      <div className='upload'>
        <input type='file' id='file_up' name='file' onChange={handleFileChange}/>
        {
          loading? <div id='file_img'><Loading/></div>:
        <div id='file_img' style={styleUpload}>
          <img src={images? images.url : ""} alt=''/>
          <span onClick={ClearImage}>✖</span>
        </div>

        }
    
      </div>
      <form onSubmit={handleSubmit}>
        <div className='row'>
           <label htmlFor='product_id'>Product Id</label>
           <input type='text' name='product_id' value={product.product_id} id="product_id" required onChange={handleInput} disabled={onEdit}/>
        </div>
        <div className='row'>
           <label htmlFor='title'>Title</label>
           <input type='text' name='title' value={product.title} id="title" required onChange={handleInput}/>
        </div>
        <div className='row'>
           <label htmlFor='price'>Price</label>
           <input type='text' name='price' value={product.price} id="price" required onChange={handleInput}/>
        </div>
        <div className='row'>
           <label htmlFor='description'>Description</label>
           <textarea type='text' name='description' value={product.description} id="description" rows='5' required onChange={handleInput}/>
        </div>
        <div className='row'>
           <label htmlFor='content'>Content</label>
           <textarea type='text' name='content' value={product.content} id="content" rows='7' required onChange={handleInput}/>
        </div>
        <div className='row'>
           <label htmlFor='categories'>Category</label>
            <select value={product.category} name='category' onChange={handleInput}>
              <option value=''>Please Select a Category</option>
               {
                 category.map(el => {
                   return(
                     <option value={el.name}key={el._id}>{el.name}</option>
                   )
                 })
               }
            </select>
        </div>
          <button type='submit'>{onEdit?'Update':'Create'}</button>
      </form>
      
    </div>
  )
}
