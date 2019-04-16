import React, { Component } from 'react';

import {
  Row,
  Col,
} from 'antd';

import Countdown from 'react-countdown-now';

import {
  Header,
  Footer,
  Elections,
} from '../../@components';

import './style.css';
import { electoralEventService } from '../../@services';

const timeCountdown = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <span>You are good to go!</span>;
  } else {
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return <h3 style={{ marginBottom: '0px' }} >Tiempo restante: {minutes}:{seconds}</h3>;
  }
};

class Ballot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      electoralEventPublickey: this.props.match.params.electoralEventPublickey,
      electoralEvent: {
        name: ''
      },
      loadingElectoralEvent: true
    }
  }

  componentDidMount = () => {
    this.getElectoralEvent();
  }

  getElectoralEvent = () => {
    electoralEventService.get(this.state.electoralEventPublickey)
      .then(electoralEvent => {
        this.setState({ electoralEvent, loadingElectoralEvent: false });
      })
      .catch(error => {
        console.log('error :', error);
      })
  }

  render() {
    return (
      <div >
        <Header />
        <div className='ballot-body'>
          <Row>
            <Col
              xs={{ span: 22, offset: 1 }}
              sm={{ span: 22, offset: 1 }}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 10, offset: 1 }}
            >
              <h1><strong>Evento Electoral:</strong> {this.state.electoralEvent.name}</h1>
            </Col>
            <Col
              xs={{ span: 22, offset: 1 }}
              sm={{ span: 22, offset: 1 }}
              md={{ span: 4, offset: 8 }}
              lg={{ span: 4, offset: 8 }}
              xl={{ span: 4, offset: 8 }}
            >
              <Countdown
                date={Date.now() + 600000}
                renderer={timeCountdown}
              />
            </Col>


          </Row>

          {!this.state.loadingElectoralEvent && (
            <Elections electoralEventPublickey={this.state.electoralEventPublickey} />
          )}

        </div>
        <Footer />
      </div>
    );
  }
}

export { Ballot };