import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { Layout } from "antd";

import logo from "../../@assets/logo.png";

import './style.css'
import { pathRoutes } from '../../@constans';

class Header extends Component {

  render() {
    return (
      <Layout.Header>
        <div className='float-left'>
          <div className="header-logo" >
            <Link to={pathRoutes.ELECTORALEVENTS}>
              <img src={logo} alt={"Logo"} />
            </Link>
          </div>
        </div>
        <div className='float-right'>
          {/* <span>MÓDULO DE VOTACIÓN</span> */}
          <span>VOTO UCV</span>
        </div>
      </Layout.Header >
    );
  }
}

export { Header };