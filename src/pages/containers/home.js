//import React, {Component} from 'react';
import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter,
} from "react-router-dom";
import AddUser  from '../../users/components/addUser';
import LoginUser from '../../users/components/loginUser';
import ChangePassword from '../../users/components/changePassword';
import createJoinCompany  from '../../companies/components/create_join';
import createCompany  from '../../companies/components/create_company';
import homeCompany  from '../../companies/components/home_company';
import updateCompany  from '../../companies/components/update_company';
import createProduct  from '../../products/components/create_product';
import homeProduct from '../../products/components/home_product';
import updateProduct from '../../products/components/update_product';
import axios from 'axios';  

class Home extends Component {
  state = {
    currentUser: undefined,
    infoUser: new Object(),
  }
  componentDidMount() {
   const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      this.setState({
        currentUser: token,
      });
    }
    const infoUser = JSON.parse(localStorage.getItem('infoUser'));
    if (infoUser) {
    this.setState({
      infoUser : infoUser,
    });
  }
}
  logOut = (e) => {
    var token = JSON.parse(localStorage.getItem('token')); 
    let config = {
headers: {
  "Authorization":token,
  "Content-Type": "application/json"}}
  
    axios.delete('http://localhost:3000/auth/logout',config)
    .then((result) => {
      console.log("SE HA ELIMINADO LA SESION CON EXITO");
      localStorage.removeItem('token');
      localStorage.removeItem('infoUser');
      this.setState({
        currentUser: undefined,
        infoUser: new Object()
      });
  })

  }
 render() {
  const { currentUser,infoUser } = this.state;
    return(
      <HashRouter>
        <div>
  <nav className="navbar navbar-inverse">
  <div className="container-fluid">
  {currentUser  &&  (
    <div className="navbar-header">
        <a className="navbar-brand"> 
        Bienvenido {infoUser.name}
        </a>
    </div>
    )}
    <ul className="nav navbar-nav navbar-right">
    {currentUser  &&  (
      
      <li>
      {infoUser.companyId !=  null && ( 
      <NavLink activeClassName="active" to="/home_product">
        Productos
      </NavLink>
       )}
        </li>
       
    )}
    {currentUser  && (
      <li>
     {infoUser.companyId !=  null && (
        <NavLink exact activeClassName="active" to="/home_company">
        Compañia
      </NavLink>
      )}
     {infoUser.companyId  == null && (
        <NavLink exact activeClassName="active" to="/create_join">
        Compañia
      </NavLink>
      )}
    </li>
   )} 

  {currentUser == undefined  && (
      <li>
      <NavLink activeClassName="active" to="/LoginUser">
        Login
      </NavLink>
        </li>
    )}
    {currentUser == undefined  && (
      <li>
        <NavLink exact activeClassName="active" to="/AddUser">
        Registrar
      </NavLink>
    </li>
   )}
  {currentUser  && (
	   <li className="dropdown">
       <a className="dropdown-toggle" data-toggle="dropdown" href="#">
       <span className="glyphicon glyphicon-user"></span>
         <span className="caret">
        </span>
        </a>
        <ul className="dropdown-menu">
          <li><a href="#"></a></li>
          <li>
    <NavLink   to="/ChangePassword">
      Cambiar contraseña
    </NavLink>    
            </li>
          <li>
    <NavLink  onClick={this.logOut} to="/LoginUser">
      Cerrar sesión
    </NavLink>
          </li>
        </ul>
      </li>
)}
    </ul>
  </div>
</nav>
            <div>
            <Route  path="/AddUser" component={AddUser}/>
            <Route  path="/LoginUser" component={LoginUser}/>
            <Route path="/ChangePassword" component={ChangePassword} />
            <Route path="/create_join" component={createJoinCompany} />
            <Route path="/create_company" component={createCompany} />
            <Route path="/home_company" component={homeCompany} />
            <Route path="/update_company" component={updateCompany} />
            <Route path="/home_product" component={homeProduct} />
            <Route path="/create_product" component={createProduct} />
            <Route path="/update_product" component={updateProduct} />
          </div>
        </div>
      </HashRouter>
        )
    }
}

export default Home