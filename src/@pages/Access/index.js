import React, { Component } from 'react';

import { Row, Col } from "antd";

import { AccessForm, Footer } from '../../@components';

import logo from "../../@assets/logo.png";

import './style.css'
class Access extends Component {

  render() {
    return (
      <div className='all-height'>
        <Row className='all-height' style={{ background: 'linear-gradient(-135deg, #083c4a, #096dd9)', paddingBottom: '5%' }}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
          >
            <br /><br />
            <div className='text-center access-logo' style={{ paddingTop: '100px' }}>
              <img src={logo} alt="Logo" width='150px' />
            </div>
            <br /><br />
            <AccessForm history={this.props.history} {...this.props} />
          </Col>
        </Row>
        <Footer />
      </div >
    );
  }
}

export { Access };