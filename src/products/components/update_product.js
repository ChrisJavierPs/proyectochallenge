import React, { Component } from 'react';
import axios from 'axios';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import { Redirect } from 'react-router';
class updateProduct extends Component {
    constructor() {
        super();
        this.state = {
          productId: '',
          name: '',
          sku:'',
          price:'',
          discount:'',
          success:false
        };
      }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount () {
    const { productId } = this.props.location.state
    this.setState({
        productId: productId
    });
    var token = JSON.parse(localStorage.getItem('token'));
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}}
    axios.get('http://localhost:3000/products',config).then((result) => {

for(let i=0; i < result.data.length;i++){
 if(result.data[i].id == this.state.productId){
    this.setState({
        name:result.data[i].name,
        sku:result.data[i].sku,
        price:result.data[i].price,
        discount:result.data[i].discount,
    })
 }
}


}).catch((error) => {

}); 
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { name,sku,price,discount } = this.state;
    var token = JSON.parse(localStorage.getItem('token')); 
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}}
  this.setState({
     success:true
  });
    axios.put(`http://localhost:3000/products/${this.state.productId}`, 
    {name,sku,price,discount},
    config
    ).then((result) => {
        console.log("SE HA CREADO CON EXITO: ", result);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }

  render() {
    if(this.state.success == true){
      return <Redirect  to="/home_product"/>
    }
    const {name,sku,price,discount} = this.state;
    return(
  <div className="login-form">
    <form>
        <h2 className="text-center">Actualizar producto</h2>       
        <div className="form-group">
        <p>Nombre:</p>
        <Input type="text" name="name" className="form-control" onChange={this.onChange} value={name} placeholder="Nombre" autoComplete="off" /> 
        </div>
        <div className="form-group">
        <p>SKU:</p>
        <Input type="text" name="sku" className="form-control" onChange={this.onChange} value={sku} placeholder="SKU" autoComplete="off" /> 
        </div>
        <div className="form-group">
        <p>Precio:</p>
        <Input type="text" name="price" className="form-control" onChange={this.onChange} value={price} placeholder="Precio" autoComplete="off" /> 
        </div>
        <div className="form-group">
        <p>Descuento:</p>
        <Input type="text" name="discount" className="form-control" onChange={this.onChange} value={discount} placeholder="Descuento" autoComplete="off" /> 
        </div>
        <div className="form-group">
            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-block">Actualizar</button>
        </div>      
    </form>
</div>

    )
}

}
export default updateProduct;