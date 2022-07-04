import React,{useContext, useState} from 'react';
import { GlobleState } from '../../GlobleState';
import Menu from '../headers/icons/menu.svg'
import Close from '../headers/icons/close.svg'
import Cart from '../headers/icons/cart.svg'
import { Link } from 'react-router-dom';
import axios from 'axios';


function Header() {
  const state = useContext(GlobleState)
  const [isLogged] = state.userApi.isLogged
  const [isAdmin] = state.userApi.isAdmin
  const [cart] = state.userApi.cart
  const [menu,setMenu] = useState(false)

   const logout = async () => {
      await axios.get('/user/logout')
      localStorage.clear()
     window.location.href ="/"
   }
  const adminRouter = () => {
   return(
    <>
    <li onClick={()=>setMenu(false)}><Link to='/create_product'>Create Product</Link></li>
    <li onClick={()=>setMenu(false)}><Link to='/category'>Categories</Link></li>
    </>
   )
  }

  const loggedRouter = () => {
    return(
      <>
    <li onClick={()=>setMenu(false)}><Link to='/history'>History</Link></li>
    {isAdmin?"":<li><Link to='/profile'>Profile</Link></li>}
    <li onClick={()=>setMenu(false)}><Link to='/' onClick={logout}>Logout</Link></li>
    </>
    )

  }
const styleMenu = {
  left:menu? 0 : '-100%'
}
  return <div>
      <header>

<div className='menu'>
  <img src={Menu} alt='' width='30' onClick={()=>setMenu(!menu)}/>
</div>

<div className='logo'>
 <Link to="/">
   <h1>{isAdmin? 'Admin': 'DevAt Shop'}</h1>
 </Link>
</div>

<ul style={styleMenu}>
  <li onClick={()=>setMenu(false)}><Link to="/">{isAdmin? 'Products': 'Shop'}</Link></li>
    {isAdmin && adminRouter()}
  
   {isLogged? loggedRouter(): <li onClick={()=>setMenu(false)}><Link to="/login">Login and Register</Link></li>}
  <li onClick={()=>setMenu(!menu)}>
    <img src={Close} alt='' width='30' className='menu' />
  </li>
</ul>

{isAdmin?'':
<div className="cart-icon">
  <span>{cart.length}</span>
  <Link to="/cart">
  <img src={Cart} alt='' width='30' />
  </Link>
</div>
}

      </header>
  </div>
}

export default Header;
