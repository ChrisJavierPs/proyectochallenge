import React, { Component } from 'react';
import axios from 'axios';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import { Redirect } from 'react-router';
import './create_join.css';

class homeCompany extends Component {
  constructor() {
    super();
    this.state = {
        success: false,
        infoCompany: new Object(),
        leave: false,
        products:[]
      };
      this.getCompanyId();
      this.onListProduct();
  }
  onEdit = (e) => {
    e.preventDefault();
    this.setState({ success: true }); 
  }
  getCompanyId = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    const infoUser = JSON.parse(localStorage.getItem('infoUser'));
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}}
  axios.get('http://localhost:3000/companies',config).then((result) => {
 let companias = result.data;
 for(let i=0; i < companias.length;i++){
 if(infoUser.companyId == companias[i].id){
  this.setState({
      infoCompany: companias[i]
  });
 }
 }
});
  }
  leaveCompany = () => {
    const infoUser = JSON.parse(localStorage.getItem('infoUser'));
    infoUser.companyId = null;
    localStorage.setItem('infoUser',JSON.stringify(infoUser));
    var token = JSON.parse(localStorage.getItem('token'));
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}}
  axios.post('http://localhost:3000/companies/leave',{},config).then((result) => {
this.setState({
leave:true
});
window.location.reload();
});
  }
  onListProduct = (e) => {
    var token = JSON.parse(localStorage.getItem('token'));
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}}
    axios.get('http://localhost:3000/products',config)
      .then((result) => {
console.log("LISTA PRODUCTO: ", result.data);
 this.setState({products:result.data})
}).catch((error) => {
  console.log(error.response.data.error);
}); 
  }
  onViewDetail = (id) => {

  }
  render() {
if (this.state.success) {return <Redirect to="/update_company" />;}
if (this.state.leave) {return <Redirect to="/create_join" />;}
const {infoCompany} = this.state;
return(
<div>
<div className="col-md-10">
  <div className="card">
    <div className="image">
      <img src="" />
    </div>
    <div className="card-inner">
      <div className="header">
        <h2>{infoCompany.name}</h2>
      </div>
    <div className="content">
    <p>Ruc: {infoCompany.ruc}</p>
    </div>
    <div className="text-right">
  <button type="button" onClick={this.onEdit} className="btn btn-primary btn-sm">Actualizar compañia</button>
    </div> 
      </div>
  </div>
</div>
<div className="col-md-2">
  <div>
  <button type="button" onClick={this.leaveCompany} className="btn btn-primary btn-sm">Dejar la compañia</button>
    </div> 
</div>
<div className="col-md-12"><div><h4>Todos los productos: </h4></div></div>

{ 
  this.state.products.map((item, key) =>
  <div>
  <div key={item.id} className="col-sm-4">
    <div className="card">
      <div className="image">
        <img src="" />
      </div>
      <div className="card-inner">
        <div className="header">
          <h2>{item.name}</h2>
        </div>
      <div className="content">
      <p>Precio: {item.price}</p>
      <p>SKU: {item.sku}</p>
      <p>Descuento: {item.discount}</p>
      </div>
        </div>
    </div>
  </div>
  </div>
    )
    }
</div>

  )
}

}
export default homeCompany;