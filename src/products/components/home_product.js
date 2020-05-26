import React, { Component } from 'react';
import axios from 'axios';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import { Redirect } from 'react-router';
//import './create_join.css';

class homeProduct extends Component {
  constructor() {
    super();
    this.state = {
        isCreate: false,
        isEdit:false,
        productId:'',
        products:[]
      };
      

  }
  componentDidMount () {
    setTimeout(() => {
      this.onListProduct();
    }, 200);
  }
  onEdit = (id) => {
 this.setState({
     isEdit:true
 });
 this.setState({
     productId:id
 });
  }
  onDelete= (id) => {
    var token = JSON.parse(localStorage.getItem('token'));
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}
} 
let productId = id;
axios.delete(`http://localhost:3000/products/${productId}`,config).then((result) => {
  setTimeout(() => {
    this.onListProduct();
  }, 200);   
alert("Se ha eliminado con exito!");

}).catch((error) => {
  console.log(error.response.data.error);
}); 
      }

  onCreate= (e) => {
this.setState({
    isCreate: true
});
  }

  onListProduct = (e) => {
    var token = JSON.parse(localStorage.getItem('token'));
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}}
    axios.get('http://localhost:3000/products',config).then((result) => {
 this.setState({products:result.data})
 console.log("LISTADO DE PRODUCTOS",  result.data);
}).catch((error) => {
  console.log(error.response.data.error);
}); 
  }
render() {
    if(this.state.isEdit == true){
       return <Redirect to={{
        pathname: '/update_product',
        state: { productId: this.state.productId }
    }}
/>
       }
    if(this.state.isCreate == true){
     return <Redirect  to="/create_product"/>
    }
return(
<div>
    <div className="col-md-1"></div>
  <div className="col-md-8"  style={{background:'white'}}>
  <table className="table">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Precio</th>
      <th scope="col">SKU</th>
      <th scope="col">Descuento</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
{ 
    this.state.products.map((item, key) =>
    <tr key={item.id}>
    <td>{item.name}</td>
    <td>{item.price}</td>
    <td>{item.sku}</td>
    <td>{item.discount}</td>
    <td><button type="button" 
     className="btn btn-primary btn-sm" onClick={()=> this.onEdit(item.id)}>Actualizar</button></td>
         <td><button type="button" 
     className="btn btn-primary btn-sm" onClick={()=> this.onDelete(item.id)}>Eliminar</button></td>
  </tr>
    )
  }
  </tbody>
</table>
  </div>
  <div className="col-md-2">
<button type="button"  onClick={this.onCreate} className="btn btn-primary btn-sm">Crear nuevo producto</button>
</div>
</div>

  )
}

}
export default homeProduct;