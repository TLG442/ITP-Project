import React, { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import "./Home.css"
import axios from 'axios'
import { Store } from './Store'


function Products(props) {
    const {products} = props
    const {state , dispatch : ctxDispatch} = useContext(Store);
    const {
        cart : {cartItems},
    } = state;
    const addToCartHandler = async(item ) =>{
      const existITem = cartItems.find((x) => x._id === products._id);
      const quantity = existITem ? existITem.quantity + 1 : 1;
      const {data} = await axios.get(`/api/products/${item._id}`);
      if(data.countInStock <quantity){
          window.alert('Sorry the product is out of stock');
          return
        }
        ctxDispatch({type : 'CART_ADD_ITEM' , payload: {...item , quantity}})
  }
  return (
    <Card>
    <Link to={`/product/${products.id}`}>
      <img id = 'img'src={products.image} className = "card-img-top" alt = {products.name} />
      </Link>
      <Card.Body>
      <Link to={`/product/${products.id}`}>
      <Card.Title>
       {products.name}
      </Card.Title>
      
      </Link>
       <Rating rating  = {products.rating} numReviews = {products.numReviews}/>
      <Card.Text>${products.price}</Card.Text>
      <Card.Text>Save 5%😄</Card.Text>
      <Card.Text>Ship to Srilanka</Card.Text>
      {products.countInStock === 0 ? <Button variant='light' disabled>Out of stock 👎</Button>
      :  <Button onClick={() => addToCartHandler(products)}> add to cart </Button>
      }
    
      </Card.Body>
      
    </Card>
  )
}

export default Products
