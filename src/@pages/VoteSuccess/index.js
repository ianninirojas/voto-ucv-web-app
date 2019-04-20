import React, { Component } from 'react';

import { Row, Col, Progress, Icon, Button } from "antd";

import { Link } from "react-router-dom";

import logo from "../../@assets/logo.png";

import './style.css'
import { pathRoutes } from '../../@constans';

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
                        <div className='text-center' style={{ paddingTop: '10px' }}>
                            <Progress type='circle' width='110px' percent={100} format={() => <Icon type='check' style={{ fontSize: '3em' }} />} status='success' />
                        </div>
                        <div className='text-center' style={{ paddingTop: '30px' }}>
                            <h2 style={{ color: "#ffffff" }}>Su voto ha sido transmitido con éxito</h2>
                        </div>
                        <div className='text-center' style={{ paddingTop: '30px' }}>
                            <Link to={pathRoutes.RESULT.replace(':electoralEventPublickey', this.props.match.params.electoralEventPublickey)}>
                                <Button type='primary' size='large'>RESULTADOS</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}

export { VoteSuccess };