import React from 'react';
import logo from "../../@assets/logo.png";

import './style.css'

const DefaultLayout = (Component) => {
  class DefaultLayout extends React.Component {
    render() {
      return (
        <div className='wrapper-default-layout bg'>
          <div className='logo'>
            <img src={logo} alt="Logo" />
          </div>
          <div className='content'>
            <Component {...this.props} />
          </div>
        </div>
      )
    }
  }
  return DefaultLayout
}

export { DefaultLayout };