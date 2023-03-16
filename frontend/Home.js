import React, { useEffect, useReducer, useState } from 'react'

import axios from 'axios'
import logger from 'use-reducer-logger'

import "./Home.css"
import  Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Products from './Products'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { Button ,  Nav} from 'react-bootstrap'
import {getError} from '../util'
import {toast , ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Category from './Category'
import {LinkContainer} from 'react-router-bootstrap'
const reducer = (state , action) => {
  switch(action.type){
    case 'FETCH REQUEST':
       return {...state , loading : true};
    case 'FETCH SUCCESS':
        return {...state , products : action.payload , loading :false}
    case 'FETCH FAIL':
          return {...state , loading :false , error:action.payload}   
    default:
      return state;
  }
}
function Home() {
  const [{loading,error,products} , dispatch ] = useReducer(logger(reducer) , {
    products:[],
    loading:true ,
     error: '',
  })
  const navigate = useNavigate();
  // const [products , setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const CategoryHandler = (category) =>{
    navigate(`/Category/${category}`)
  }
  useEffect(() => {
      const fetchData = async() =>{
        dispatch({type : 'FETCH REQUEST'});
        try {
          const result = await axios.get('/api/products');
          dispatch({type:'FETCH SUCCESS' , payload : result.data})
        } catch (error) {
          dispatch({type:'FETCH FAIL',payload: error.message});
        }
      
        //setProducts(result.data);
      };
      fetchData();
      const fetchCategories = async () => {
        try {
          const { data } = await axios.get(`/api/products/categories`);
           setCategories(data);
        } catch (err) {
          toast.error(getError(err));
        }
      };
      fetchCategories();
  },[]);
  return (
   
    <div className='Home'>
      <main>
      <Helmet>
       <title>Gym picco</title>
    </Helmet>
     <div className='home__container'>
       <img src = "https://images.wallpaperscraft.com/image/single/gym_weightlifting_disks_118224_2560x1024.jpg"></img> 
     </div>
     <div className='category'>
      <center>Categories</center>
      </div>
    
      <div className="cat-container">
   {categories.map((category) => (
     <div key={category} className = "cat">
             
           
         <Button type="button" onClick={() =>CategoryHandler(category)}><p id="cat-1" className="cat-title">{category}</p></Button>  
              
             </div>
             
            ))}
            
            
            </div>
	 
	 
	 
	
	 
   
  
      <div className='products'>{
       <Row>{
       products.map(products => (
        <Col sm = {6} md = {4} lg = {3} className = "mb-3">
             <Products products = {products}></Products>
              </Col>

           ))}
           </Row>
      }
      </div>
      </main>
    </div>
    
  )
  
}

export default Home
