import React from 'react'
import { Link } from 'react-router-dom'

const ErrorHandle = () => {
  return (
    <div >
      <div style={{color:"red",backgroundColor:"white",fontSize:"100px"}}>Please authorise !!</div>
     
     
     <a style={{fontSize:"30px",color:"blue",fontWeight:"bold"}} href="/">click authorise</a>
    
    
    
    </div>
    
  )
}

export default ErrorHandle