import React, { Component } from 'react';

import { Layout } from "antd";

import logo from "../../@assets/logo.png";

import './style.css'

class Header extends Component {

  render() {
    return (
      <Layout.Header>
        <div className='float-left'>
          <div className="header-logo" >
            <img src={logo} alt={"Logo"} />
          </div>
        </div>
        <div className='float-right'>
          <span>MÓDULO DE VOTACIÓN</span>
        </div>
      </Layout.Header>
    );
  }
}

export { Header };