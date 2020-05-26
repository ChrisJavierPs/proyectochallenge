import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './header.css';

class Header extends Component {
  constructor() {
    super();
  };
  render() { 
  return ( 
    <body>
    <div className="header">
      <a href="#default" class="logo">LexMax</a>
      <div className="header-right">
      <NavLink exact activeClassName="active" to="/AddUser">
        Registrar
      </NavLink>
      <NavLink activeClassName="active" to="/LoginUser">
        Login
      </NavLink>
      </div>
    </div> 
    </body>
  );
 
}
}
export default Header;

