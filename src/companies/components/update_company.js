import React, { Component } from 'react';
import axios from 'axios';  
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import { Redirect } from 'react-router';
class updateCompany extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          ruc: '',
          success:false
        };
        this.getCompanyId();
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
    console.log("SESSION: ", token);
    const infoUser = JSON.parse(localStorage.getItem('infoUser'));
    let  companyId = infoUser.companyId;
    const { name, ruc } = this.state;
    axios.put(`http://localhost:3000/companies/${companyId}`,
    {name,ruc},
    config
    ).then((result) => {
      this.setState({
        success:true
      });
   console.log("Se actualizado con exito");
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
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
    name: companias[i].name,
    ruc:companias[i].ruc
  });
 }
 }
});
  }
  render() {
  if(this.state.success == true){
   return <Redirect  to="/home_company"/>
  }
    const {name, ruc} = this.state;
    return(
  <div className="login-form">
    <form>
        <h2 className="text-center">Actualizar compañia</h2>       
        <div className="form-group">
        <p>Nombre:</p>
        <Input type="text" name="name" className="form-control" onChange={this.onChange} value={name} placeholder="Nombre de la empresa" autoComplete="off" /> 
        </div>
        <div className="form-group">
        <p>R.U.C:</p>
        <Input type="text" className="form-control" name="ruc" onChange={this.onChange} value={ruc} placeholder="R.U.C" autoComplete="off" />
        </div>
        <div className="form-group">
            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-block">Actualizar</button>
        </div>      
    </form>
</div>

    )
}

}
export default updateCompany;