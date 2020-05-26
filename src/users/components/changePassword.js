import React, { Component } from 'react';
import axios from 'axios';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import './loginUser.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import createCompany  from '../../companies/components/create_company';
import { Redirect } from 'react-router';

class changePassword extends Component {
  constructor() {
    super();
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation:'',
      success:false
    };
    
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    var token = JSON.parse(localStorage.getItem('token'));
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"
}
    }
 
    const { oldPassword, newPassword, newPasswordConfirmation } = this.state;
    axios.put('http://localhost:3000/users/me/change_password', 
    {oldPassword,newPassword, newPasswordConfirmation}, config)
      .then((result) => {
        this.setState({
          success:true
        });
        alert("Se ha cambiado la contraseña con exito!");
        console.log("SE HA CAMBIADO CON EXITO LA CONTRASEÑA!!");
      }).catch((error) => {
        console.log(error.response.data.error);
      });;
      
  }

  render() {
    if(this.state.success == true){
      return <Redirect  to="/LoginUser"/>
    }
    const {oldPassword, newPassword,newPasswordConfirmation} = this.state;
    return (
<div className="login-form">
    <form action="/examples/actions/confirmation.php" method="post">
        <h2 className="text-center">Cambiar contraseña</h2>       
        <div className="form-group">
        <p>Contraseña actual:</p>
        <Input type="password"  className="form-control" name="oldPassword" onChange={this.onChange} value={oldPassword} placeholder="Contraseña actual" autoComplete="off" /> 
        </div>
        <div className="form-group">
        <p>Nueva contraseña:</p>
        <Input type="password" className="form-control" name="newPassword" onChange={this.onChange} value={newPassword} placeholder="Nueva contraseña" autoComplete="off" />
        </div>
        <div className="form-group">
        <p>Confirmar nueva contraseña:</p>
        <Input type="password" className="form-control" name="newPasswordConfirmation" onChange={this.onChange} value={newPasswordConfirmation} placeholder="Confirmar nueva contraseña" autoComplete="off" />
        </div>
        <div className="form-group">
            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-block">Cambiar contraseña</button>
        </div>      
    </form>
</div>




    );
  }
}

export default changePassword;