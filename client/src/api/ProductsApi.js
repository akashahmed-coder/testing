import React,{useState,useEffect} from 'react';
import axios from 'axios'


function ProductsApi() {
  const [products,setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [callback,setCallback] = useState(false)
  const [category,setCategory] = useState('')
  const [sort,setSort] = useState('')
  const [search,setSearch] = useState('')
  const [page,setPage] = useState(1)
  const [result,setResult] = useState(0)


useEffect(()=>{

  const getProducts = async () => {
     try {
      const res = await axios.get(`/api/product?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
      setProducts(res.data.product)
      setResult(res.data.result)
      console.log(res.data.result)
     } catch (err) {
       console.log(err)
     }
  }
  getProducts()
},[callback,category,sort,search,page,result])

useEffect(()=>{
  const getAllProducts = async () =>{
    try {
      const res = await axios.get("/api/allproduct")
      setAllProducts(res.data.product)
      
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  getAllProducts()
},[])
console.log(allProducts)
  return {
    products:[products,setProducts],
    allProducts:[allProducts,setAllProducts],
    callback:[callback,setCallback],
    category:[category,setCategory],
    sort:[sort,setSort],
    search:[search,setSearch],
    page:[page,setPage],
    result:[result,setResult]
  }
  
     
  
}

export default ProductsApi;

