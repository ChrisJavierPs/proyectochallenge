import React, { Component } from 'react';
import axios from 'axios';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import { Redirect } from 'react-router';
class createCompany extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          ruc: '',
          success:false
        };
        
      }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { name, ruc } = this.state;
    var token = JSON.parse(localStorage.getItem('token')); 
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"
}
    }
    axios.post('http://localhost:3000/companies/create_join', 
    {name,ruc},
    config
    ).then((result) => {
      const infoUser = JSON.parse(localStorage.getItem('infoUser'));
      infoUser.companyId = result.data.id;
      localStorage.setItem('infoUser',JSON.stringify(infoUser));
       this.setState({
         success:true
       });
       window.location.reload();
        console.log("SE HA CREADO CON EXITO: ", result);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }

  render() {
    if(this.state.success == true){
      return <Redirect  to="/home_company"/>
    }
    const {name, ruc} = this.state;
    return(
  <div className="login-form">
    <form action="/examples/actions/confirmation.php" method="post">
        <h2 className="text-center">Crear una nueva compañia</h2>       
        <div className="form-group">
        <p>Nombre:</p>
        <Input type="text" name="name" className="form-control" onChange={this.onChange} value={name} placeholder="Nombre de la empresa" autoComplete="off" /> 
        </div>
        <div className="form-group">
        <p>R.U.C:</p>
        <Input type="text" className="form-control" name="ruc" onChange={this.onChange} value={ruc} placeholder="R.U.C" autoComplete="off" />
        </div>
        <div className="form-group">
            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-block">Crear</button>
        </div>      
    </form>
</div>

    )
}

}
export default createCompany;