import React, { useContext } from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Products from './products/Products';
import DetialsProduct from './detialsProduct/DetialsProduct';
import NotFound from './utiles/not_Found/NotFound';
import  OderHistory  from './history/OderHistory';
import DetailsHistory from './detailHistory/DetailsHistory';
import Category from './categoris/Category';
import Status from './history/Status';
import CreateProduct from './createProduct/CreateProduct';
import {
  Route,Switch
} from "react-router-dom";
 import {GlobleState} from '../../GlobleState'

function Pages() {
  const state = useContext(GlobleState)
  const [isLogged] = state.userApi.isLogged
  const [isAdmin] = state.userApi.isAdmin
  return (

    <Switch>
    <Route path="/" exact component={Products}/>
    <Route path="/details/:id" exact component={DetialsProduct}/>
    <Route path="/login" exact component={isLogged? NotFound: Login}/>
    <Route path="/register" exect component={isLogged? NotFound: Register}/>
    <Route path="/history" exact component={isLogged? OderHistory: NotFound}/>
    <Route path="/history/:id" exact component={isLogged? DetailsHistory: NotFound}/>
    <Route path="/cart" exact component={isAdmin? NotFound : Cart}/>
    <Route path="/category" exact component={isAdmin? Category : NotFound}/>
    <Route path="/status/:id" exact component={isAdmin? Status : NotFound}/>
    <Route path="/create_product" exact component={isAdmin? CreateProduct : NotFound}/>
    <Route path="/Edit_product/:id" exact component={isAdmin? CreateProduct : NotFound}/>



    <Route path="*" exact component={NotFound}/>

        
    
  </Switch>

  )
     
  
}

export default Pages;

