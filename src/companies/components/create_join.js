import React, { Component } from 'react';
import axios from 'axios';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import { Redirect } from 'react-router';
import './create_join.css';

class createJoinCompany extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      companies:[],
      join: false
    };
    this.onList();
  }

  onCreate = (e) => {
    e.preventDefault();
    this.setState({ success: true }); 
  }

  onJoin = (id) => {
    var token = JSON.parse(localStorage.getItem('token'));
    console.log("El codigo ha unir es: ", id);
    let companyId = id;
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}}
  const infoUser = JSON.parse(localStorage.getItem('infoUser'));
  infoUser.companyId = companyId;
  localStorage.setItem('infoUser',JSON.stringify(infoUser));
    axios.post('http://localhost:3000/companies/join',{companyId},config)
    .then((result) => {
    this.setState({
      join:true
    });
    window.location.reload();
    console.log("Se ha unido con exito!!", infoUser);
}).catch((error) => {
  console.log(error.response.data.error);
});

  }


  onList = (e) => {
    var token = JSON.parse(localStorage.getItem('token'));
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}}
    axios.get('http://localhost:3000/companies',config)
      .then((result) => {
 this.setState({companies:result.data})

});
      
  }

  render() {
if(this.state.join){return <Redirect  to="/home_company"/>}
if (this.state.success) {return <Redirect to="/create_company" />;}
return(
<div>
<div className="text-center">
<button type="button" onClick={this.onCreate} className="btn btn-primary btn-sm">Crear nueva compañia</button>
</div>
{
this.state.companies.map((item, key) =>
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
    <p>Ruc: {item.ruc}</p>
    </div>
    <div className="text-center">
  <button type="button" onClick={() => this.onJoin(item.id)} className="btn btn-primary btn-sm">Unirse a esta compañia</button>
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
export default createJoinCompany;