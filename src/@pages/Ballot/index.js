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
  Spinner,
} from '../../@components';

import './style.css';
import { electoralEventService, voterService } from '../../@services';
import { pathRoutes } from '../../@constans';

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
    this.CountdownRef = React.createRef();
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

  Timeout = () => {
    this.props.history.push(pathRoutes.TIMEOUT);
    return <span>You are good to go!</span>;
  }

  timeCountdown = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <this.Timeout />;
    }
    else {
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      return <h3 style={{ marginBottom: '0px' }} >Tiempo restante: {minutes}:{seconds}</h3>;
    }
  };

  controlledCountdown = (option) => {
    switch (option) {
      case 1:
        this.CountdownRef.current.start();
        break;
      case 2:
        this.CountdownRef.current.pause();
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div >
        <Header />
        {this.state.loadingElectoralEvent && (
          <Spinner />
        )}

        {!this.state.loadingElectoralEvent && (
          <div className='container'>
            <Row style={{paddingTop: '20px'}} >
              <Col
                xs={{ span: 23 }}
                sm={{ span: 23 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 11 }}
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
                  renderer={this.timeCountdown}
                  ref={this.CountdownRef}
                />
              </Col>
            </Row>
            <Elections
              electoralEventPublickey={this.state.electoralEventPublickey}
              elections={this.props.location.state.elections}
              controlledCountdown={this.controlledCountdown}
              {...this.props}
            />
          </div>
        )}
      </div>
    );
  }
}

export { Ballot };