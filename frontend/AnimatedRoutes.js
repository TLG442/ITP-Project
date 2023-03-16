import React from 'react'
import { useLocation , Routes , Route } from 'react-router-dom'
import CartScreen from './CartScreen';
import Category from './Category';
import CoachScreen from './CoachScreen';
import CreateProduct from './CreateProduct';
import Home from './Home';
import Product from './Product';
import ProductListScreen from './ProductListScreen';
import ProtectedRoutes from './ProtectedRoutes';
import Search from './Search';
import SearchScreen from './SearchScreen';
import SigninScreen from './SigninScreen';
import UpdateProduct from './UpdateProduct';
import {AnimatePresence} from "framer-motion";
import AddCoach from './AddCoach';
import Signout from './Signout';
import Shipping from './Shipping';
function AnimatedRoutes() {
    const location = useLocation();
  return (
    <AnimatePresence>
    <Routes location={location} key = {location.pathname}>
    <Route path = "/product/:id" element = {<Product/>}/>
    <Route path = "/search/:id" element = {<Search/>}/>
    <Route path='/' element = {<Home/>}/>
    <Route path='/cart' element = {<CartScreen/>}/>
    <Route path='/search' element = {<SearchScreen/>}/>
    <Route path='/admin' element = {
    <ProtectedRoutes><ProductListScreen/></ProtectedRoutes>
    }/>
    <Route path = '/coach' element = { <ProtectedRoutes><CoachScreen/></ProtectedRoutes>}/>
    <Route path='/create' element = {<CreateProduct/>}/>
    <Route path='/addCoach' element = {<AddCoach/>}/>
    <Route path='/update/:id' element = {<UpdateProduct/>}/>
    <Route path='/signin' element = {<SigninScreen/>}/>
    <Route path='/Category/:category' element = {<Category/>}/>
    <Route path = '/signup' element = {<Signout/>}/>
    <Route path = 'shipping' element = {<Shipping/>}/>
</Routes>
</AnimatePresence>
  )
}

export default AnimatedRoutes
