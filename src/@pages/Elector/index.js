import React, { Component } from 'react';

import { ElectorList } from '../../@components/ElectorList';

import logo from "../../@assets/logo-black.png";

class Electors extends Component {

  render() {
    return (
      <div>
        <div className='logo'>
          <img src={logo} alt="Logo" />
        </div>
        <ElectorList {...this.props} />
      </div>
    )
  }
}

export { Electors };