import React, { Component } from 'react';

import { Row, Col } from "antd";

import { Footer } from '../../@components';

import logo from "../../@assets/logo.png";

import './style.css'

class VoteSuccess extends Component {

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
                        <div className='text-center' style={{ paddingTop: '70px' }}>
                            <img src={logo} alt="Logo" width='150px' />
                        </div>
                        <br />
                        <div className='text-center' style={{ paddingTop: '50px'}}>
                            <h2 style={{ color:"#ffffff"}}>Su voto ha sido transmitido con éxito</h2>
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}

export { VoteSuccess };