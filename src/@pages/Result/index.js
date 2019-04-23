import React, { Component } from 'react';

import {
  Row,
  Col,
} from 'antd';

import {
  Header,
  Spinner,
  ElectionResults,
} from '../../@components';

import { electoralEventService, electionService } from '../../@services';

import './style.css';

class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      electoralEventPublickey: this.props.match.params.electoralEventPublickey,
      electoralEvent: {
        name: ''
      },
      elections: [],
      loadingElectoralEvent: true,
      loadingElections: true
    }
  }

  componentDidMount = () => {
    this.getElectoralEvent();
    this.getElections();
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

  getElections = () => {
    electionService.getAll(this.state.electoralEventPublickey)
      .then(elections => {
        this.setState({ elections, loadingElections: false })
      })
      .catch(error => {
        console.log('error :', error);
      })
  }

  render() {
    return (
      <div >
        <Header />
        {(this.state.loadingElectoralEvent || this.state.loadingElections) && (
          <Spinner />

        )}
        {!this.state.loadingElectoralEvent && !this.state.loadingElections && (
          <div className='container'>
            <div style={{ paddingTop: '20px' }}>
              <h1> <strong>Evento Electoral:</strong> {this.state.electoralEvent.name}</h1>
            </div>
            <ElectionResults
              elections={this.state.elections}
              electoralEvent={this.state.electoralEvent}
              electoralEventPublickey={this.state.electoralEventPublickey}
            />
          </div>
        )}
      </div>
    );
  }
}

export { Result };