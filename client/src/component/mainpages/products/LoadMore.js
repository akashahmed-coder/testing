import React, { useContext } from 'react'
import { GlobleState } from '../../../GlobleState'

export default function LoadMore() {
    const state = useContext(GlobleState)
    const [page,setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result
  return (
    <div className='laod_more'>
        {
            result<page*9?''
            :<button className='loadmoreButton' onClick={()=>setPage(page+1)}>Load More</button>
        }
    </div>
  )
}
