import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [user,setUser] = useState({
    name:'',email:'',password:''
  })



  const onChangeInput = (e) =>{
      const {name , value} = e.target
      setUser({...user ,[name]:value})
  }
  const loginSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register",{...user})

      localStorage.setItem('firstLogin',true)
      window.location.href = "/"
  
      
    } catch (err) {
      alert(err.response.data.msg) 
    }
  }
  useEffect(()=>{
    document.title = 'Register'
  })
  return <div className='login-page'>
     <h2>Register</h2>
         <form onSubmit={loginSubmit}>
         <input type='text' placeholder='Name' name='name' required value={user.name} onChange={onChangeInput} />
         <input type='email' placeholder='Email' name='email' required value={user.email} onChange={onChangeInput} />
         <input type='password' placeholder='Password' name='password' required autoComplete='on' value={user.password} onChange={onChangeInput} />
          
        <div className='row'>
          <button type='submit'>Register</button>
          <Link to='/login'>Login</Link>
        </div>

          </form>     
  </div>;
}
