import axios from 'axios';
import { Button, Form} from 'react-bootstrap'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
function UpdateScreen() {
  const params = useParams(); 
  const {id} = params;
  // const [ttrs , setid] = useState();
  const [name , setname] = useState();
  const [category , setcategory] = useState();
  const [imageLink , setImagelink] = useState();
  const [price , setprice] = useState();
  const [countInStock , setcountInStock] = useState();
  const [rating , setrating] = useState();
  const [brand , setbrand] = useState();
  const [reviews , setreviews] = useState();
  const [description , setdescription] = useState();
  
  const updateData =() =>{
      axios.put(
         `/api/products/update/`,
         {name : name  , id : id , category : category , image : imageLink 
         ,price : price , countInStock : countInStock , brand : brand , rating : rating
         ,numReviews : reviews , description : description},
         );
     
   
    
    }
  return (
    <div>
    <Helmet>
      <title>Create Product</title>
    </Helmet>
    <strong className="mb-3">Create Product</strong>
    <Form>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Name </Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setname(event.target.value)
        }} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>category</Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setcategory(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>image link</Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setImagelink(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>price</Form.Label>
        <Form.Control type="number"onChange={(event) => {
            setprice(event.target.value)
        }} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>countInStock</Form.Label>
        <Form.Control type="number" onChange={(event) => {
            setcountInStock(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>rating</Form.Label>
        <Form.Control type="number"onChange={(event) => {
            setrating(event.target.value)
        }} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>brand</Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setbrand(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>number of reviews</Form.Label>
        <Form.Control type="number" onChange={(event) => {
            setreviews(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>description</Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setdescription(event.target.value)
        }}required />
      </Form.Group>
      <div className="mb-3">
        <Button type="submit" onClick={ updateData}>Create Product</Button>
      </div>
   </Form>
   </div>
  )
}

export default UpdateScreen
