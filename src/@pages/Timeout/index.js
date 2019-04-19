import React, { Component } from 'react';

import { Row, Col } from "antd";

import { Footer } from '../../@components';

import logo from "../../@assets/logo.png";

import './style.css'

class Timeout extends Component {

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
                            <h1 style={{ color:"#ffffff"}}>Se acabó el tiempo</h1>
                            <h3 style={{ color:"#ffffff"}}>Por favor, para continuar con la votación ingrese nuevamente</h3>
                            <h3 style={{ color:"#ffffff"}}>al link del correo "Autorización Evento Electoral"</h3>
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}

export { Timeout };