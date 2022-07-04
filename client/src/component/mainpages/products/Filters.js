import React, { useContext } from 'react'
import { GlobleState } from '../../../GlobleState'


export default function Filters() {
const state = useContext(GlobleState)
const [categories] = state.categoryApi.category
const [category,setCategory] = state.productsAPI.category 
const [sort,setSort] = state.productsAPI.sort
const [search,setSearch] = state.productsAPI.search


const selectChange = (e) => {
   setCategory(e.target.value)
   setSearch('')
}
  return (
    <div className='filter_menu'>
      <div className='row'>
        <span>Filters: </span>
        <select name='category' value={category} onChange={selectChange}>
             <option Value=''>All Products</option>
             {
              categories.map(category =>{
                 return(
                  <option value={'category='+ category.name}>
                    {category.name}
                  </option>
                 )
              })
             }
        </select>
      </div>

      <input type='text' placeholder='Search Products' value={search} onChange={e=> setSearch(e.target.value)} />

      <div className='row sort'>
        <span>Short By: </span>
        <select name='sort' value={sort} onChange={e=> setSort(e.target.value)}>
             <option Value=''>Newest</option>
             <option Value='sort=oldest'>Oldest</option>
             <option Value='sort=-sold'>Best Sale</option>
             <option Value='sort=-price'>Price: High-Low</option>
             <option Value='sort=price'>Price: Low-High</option>
           
        </select>
      </div>

    </div>
  )
}
