import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Button, Row , Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';



function ProductListScreen() {
  const navigate = useNavigate();
 const [products, setProducts] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get('/api/products');
    setProducts(result.data);
  };
  fetchData();
}, []);

const addToDatabase = () =>{
  navigate('/create')
 
}

const addCoach = () =>{
  navigate('/addCoach')
 
}
const deleteProduct = (id) =>{
  axios.delete(`api/products/delete/${id}`)
  navigate('/')
}
return (
    <div>
      <h1>Products</h1>
     
        <>
     
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>UPDATE Products</th>
                <th>DELETE PRODUCTS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td><img id = "adminimage"src={product.image}></img></td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>  <Button type="button" onClick={() => navigate(`/update/${product._id}`)} >
                         update product 
                        </Button>
                  </td>
                  <td>  <Button type="button" onClick={() => deleteProduct(product._id)} >
                         delete product
                        </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </>
        <Row>
        
        <Col className="col text-mid">
          <div id = "createButton">
            <Button type="button" id = "createButton" onClick={addToDatabase} >
              Create Product
            </Button>
            <Button type="button" id = "createButton" onClick={addCoach} >
              Add Coach
            </Button>
            <Button type="button" id = "createButton" >
              Add Doctor
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default ProductListScreen