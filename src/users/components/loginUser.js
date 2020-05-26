import React, { Component } from 'react';
import axios from 'axios';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import './loginUser.css';
import { Redirect } from 'react-router';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import createCompany  from '../../companies/components/create_company';

class loginUser extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      infoUser:undefined,
    };
    
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('http://localhost:3000/auth/login', {email, password})
      .then((result) => {
       var token = JSON.stringify(result.data.sessionId);
        localStorage.setItem('token',token);
        let config = {
       headers: {
      "Authorization":result.data.sessionId,
      "Content-Type": "application/json"
    }
  }
  axios.get('http://localhost:3000/users/me',config)
  .then((result2) => {
  localStorage.setItem('infoUser',JSON.stringify(result2.data));
  this.setState({infoUser:result2.data});
  window.location.reload();
  })
      });

      
  }
  render() {
     const {email, password,infoUser} = this.state; 
    if(infoUser != undefined){
      if (infoUser.companyId) {
        return <Redirect to="/home_company" />;
        }
        if (infoUser.companyId == null) {
          return <Redirect to="/create_join" />;
          }  
    }
    return (
<div className="login-form">
    <form action="/examples/actions/confirmation.php" method="post">
        <h2 className="text-center">Log in</h2>       
        <div className="form-group">
        <p>Email:</p>
        <Input type="text" name="email" className="form-control" onChange={this.onChange} value={email} placeholder="Email" autoComplete="off" /> 
        </div>
        <div className="form-group">
        <p>Contraseña:</p>
        <Input type="password" className="form-control" name="password" onChange={this.onChange} value={password} placeholder="Password" autoComplete="off" />
        </div>
        <div className="form-group">
            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-block">Login</button>
        </div>      
    </form>
</div>




    );
  }
}

export default loginUser;