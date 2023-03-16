import "bulma/css/bulma.min.css";
import Header from "./Header";
import Home from "./Home";
import {BrowserRouter, Route, Routes}from 'react-router-dom';
import Product from "./Product"
import { Badge, Container, Navbar , Nav, Button  } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { Store } from "./Store";
import React, { useContext, useEffect, useState, } from 'react'
import { Link } from "react-router-dom";
import CartScreen from "./CartScreen";
import {toast , ToastContainer} from 'react-toastify'
import axios from "axios";
import {getError} from '../util'
import SearchBox from "./SearchBox";
import SearchScreen from "./SearchScreen";
import AdminDashBoard from "./AdminDashBoard";
import ProductListScreen from "./ProductListScreen";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import UpdateScreen from "./UpdateScreen";


function Navigation() {

    const {state } = useContext(Store);
    const {cart } = state
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchCategories = async () => {
        const result = await axios.get('/api/products');
        setProducts(result.data);
      };
     fetchCategories();
    }, []);
  return (
  
    <div className="d-flex flex-column site-container">
    <div className={sidebarIsOpen ? "d-flex flex-column site-container active-cont" :"d-flex flex-column site-container"}>
      <ToastContainer position="bottom-center" limit = {1}/>
    
    <Navbar bg = "dark" variant = "dark">
      <Container>
      <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
         <LinkContainer to = "/">
        <Navbar.Brand>Gym picco</Navbar.Brand>
       
        </LinkContainer>
         <LinkContainer to = "/admin">
        <Navbar.Brand>AdminDashBoard</Navbar.Brand>
        {/* {categories.map((category) => (
         {category}

))} */}
 
     
        </LinkContainer>
        
        <div id = "search">
        <SearchBox />
        </div>
         <Nav className = "me_auto">
       <Link to = "/cart" className = "nav-link">
        cart{
          cart.cartItems.length > 0 &&(
            <Badge pill bg = "danger">
              {cart.cartItems.reduce((a , c ) => a + c.quantity , 0)}
            </Badge>
          )
        }
       </Link>
        </Nav>
      </Container>
    </Navbar>
    <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories <br/>
               
               
              </strong>
            </Nav.Item>
           
           
              {/* <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link></Nav.Link>
                </LinkContainer>
              </Nav.Item> */}
           
          </Nav>
        </div>
    <Container className="mt-3">
    
    </Container>
    </div>
    </div>
  



  )
}

export default Navigation
