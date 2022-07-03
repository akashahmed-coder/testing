import React,{useContext} from 'react';
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

   const logout = async () => {
      await axios.get('/user/logout')
      localStorage.clear()
     window.location.href ="/"
   }
  const adminRouter = () => {
   return(
    <>
    <li><Link to='/create_product'>Create Product</Link></li>
    <li><Link to='/category'>Categories</Link></li>
    </>
   )
  }

  const loggedRouter = () => {
    return(
      <>
    <li><Link to='/history'>History</Link></li>
    {isAdmin?"":<li><Link to='/profile'>Profile</Link></li>}
    <li><Link to='/' onClick={logout}>Logout</Link></li>
    </>
    )

  }

  return <div>
      <header>

<div className='menu'>
  <img src={Menu} alt='' width='30' />
</div>

<div className='logo'>
 <Link to="/">
   <h1>{isAdmin? 'Admin': 'DevAt Shop'}</h1>
 </Link>
</div>

<ul>
  <li><Link to="/">{isAdmin? 'Products': 'Shop'}</Link></li>
    {isAdmin && adminRouter()}
  
   {isLogged? loggedRouter(): <li><Link to="/login">Login and Register</Link></li>}
  <li>
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
