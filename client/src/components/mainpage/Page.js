import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './Home/Home'
import NotFound from './NotFound'

export default function Page() {
  return (
    
    <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='*' element={<NotFound/>}/>
        
    </Routes>
  
  )
}
