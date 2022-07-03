import React from 'react'
import loadingAnimation from './loading.gif'

export default function Loading() {
  const loadingStyle = {
    width:'100%',
    height:'100%',
    margin: '0 auto'

  }
  return (
    <div style={loadingStyle}>
        <img src={loadingAnimation} width='100%' height='100%' alt='loading...'/>
    </div>
  )
}
