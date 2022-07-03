import React, { useEffect, useState } from 'react'
import Navber from '../navber/Navber'
import secONeImg from '../../../img/img-3.jpg'
import axios from 'axios'

export default function Home() {
  const [categories,setCategories] = useState([])
 useEffect(()=>{
    const getCategory = async() => {
        try{
           const res = await axios.get("/api/category")
           setCategories(res.data)
           console.log(res)
           console.log(categories)
        }catch(err){
          console.log(err.response.data.msg)
        }
    }
    getCategory()
 },[])
  return (
    <div>
        <div className='homeHeader'> 
        <Navber/>
        <div className='container'>
            <div className='header-text'>
            <p>Save This Weekend</p>
            <h1>awesome design best furniture for your interior</h1>
            <button>Explore More</button>
            </div>
            
        </div>
        </div>
        
       <div className='container'>
           <div className='home-sectinOne'>
               <div className='img-sectionOne'>
               <img src={secONeImg} alt=''/>
               <div className='backpart-SectionOne-Img'>

               </div>
               </div>
               <div className='details-sectionOne'>
                  <p className='details-sectionOne-miniTitle'>Welcome to Our Store</p>
                  <h2>
                     we create the product you tell us your wish existed
                  </h2>
                  <p  className='details-sectionOne-title'> Lorem Ipsum generators on the Internet tend to repeat predefined 
                    chunks as necessary, making this the first true generator on the Internet. 
                    It uses a dictionary of over 200 Latin words, combined with a handful of model s
                    entence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
                     Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                     <button>Read More</button>
               </div>
              
           </div>
       </div>
           <div className='category'>
                  {
                    categories.map(category=>{
                      return(
                        <div>
                            <h1>{category.name}</h1>
                        </div>
                      )
                    })
                  }
           </div>
    </div>
  )
}
