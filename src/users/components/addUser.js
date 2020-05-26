import React, { Component } from 'react';
import axios from 'axios';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import { Redirect } from 'react-router';
class addUser extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation:'',
      success:false
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, passwordConfirmation } = this.state;
    axios.post('http://localhost:3000/auth/signup', { name, email, password, passwordConfirmation })
      .then((result) => {
        console.log("EL RESULTADO DE REGISTRARSE HA SIDO: ", result);
        this.setState({
          success:true
        });
        alert("Se ha registrado con exito!");
      });
  }
  render() {
    if(this.state.success == true){
    return <Redirect  to="/LoginUser"/>
    }
    const { name, email, password,passwordConfirmation } = this.state;
    return (
<div className="login-form">
    <form action="/examples/actions/confirmation.php" method="post">
        <h2 className="text-center">Registrar nuevo usuario</h2>       
        <div className="form-group">
          <p>Nombre:</p>
        <Input type="text" name="name" onChange={this.onChange} value={name} placeholder="Nombre" autoComplete="off" />
        </div>
        <div className="form-group">
        <p>Email:</p>
        <Input type="text" name="email" onChange={this.onChange} value={email} placeholder="Email" autoComplete="off" />
        </div>
        <div className="form-group">
        <p>Contraseña:</p>
        <Input type="password" name="password" onChange={this.onChange} value={password} placeholder="Contraseña" autoComplete="off" />  
        </div>
        <div className="form-group">
        <p>Confirmar contraseña:</p>
        <Input type="password" name="passwordConfirmation" onChange={this.onChange} value={passwordConfirmation} placeholder="Confirmar contraseña" />
        </div>
        <div className="form-group">
            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-block">Registrar</button>
        </div>      
    </form>
</div>
    );
  }
}
export default addUser;