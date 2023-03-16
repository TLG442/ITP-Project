import axios from 'axios';
import { Button, Form} from 'react-bootstrap'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
function UpdateProduct() {
     const params = useParams(); 
    const {id : productId} = params;
    const [id , setid] = useState();
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
           `/api/products/update/${productId}`,
           { _id : productId, name : name  , id : id , category : category , image : imageLink 
           ,price : price , countInStock : countInStock , brand : brand , rating : rating
           ,numReviews : reviews , description : description},
           );
       
     
      
      }
  return (
    <div>
    <Helmet>
      <title>Update Product</title>
    </Helmet>
    <strong className="mb-3">Update Product</strong>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name </Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setname(event.target.value)
        }} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Id </Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setid(event.target.value)
        }} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>category</Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setcategory(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>image link</Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setImagelink(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>price</Form.Label>
        <Form.Control type="number"onChange={(event) => {
            setprice(event.target.value)
        }} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>countInStock</Form.Label>
        <Form.Control type="number" onChange={(event) => {
            setcountInStock(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>rating</Form.Label>
        <Form.Control type="number"onChange={(event) => {
            setrating(event.target.value)
        }} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>brand</Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setbrand(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>number of reviews</Form.Label>
        <Form.Control type="number" onChange={(event) => {
            setreviews(event.target.value)
        }}required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>description</Form.Label>
        <Form.Control type="text" onChange={(event) => {
            setdescription(event.target.value)
        }}required />
      </Form.Group>
      <div className="mb-3">
        <Button type="submit" onClick = {updateData}  >Update Product</Button>
      </div>
   </Form>
   </div>
  )
}

export default UpdateProduct
