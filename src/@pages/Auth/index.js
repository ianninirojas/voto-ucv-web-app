import React, { Component } from 'react';

import { Row, Col } from "antd";

import { AuthForm, Footer } from '../../@components';

import logo from "../../@assets/logo.png";

import './style.css'
class Auth extends Component {

  render() {
    return (
      <div className='all-height'>
        <Row className='all-height' style={{ background: 'linear-gradient(-135deg, #083c4a, #096dd9)' }}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
          >
            <div className='text-center access-logo' style={{ paddingTop: '100px' }}>
              <img src={logo} alt="Logo" width='150px' />
            </div>
            <br />
            <div className='auth-box' style={{ paddingTop: '50px' }}>
              <AuthForm history={this.props.history} {...this.props} />
            </div>
          </Col>
        </Row>
        <Footer />
      </div >
    );
  }
}

export { Auth };