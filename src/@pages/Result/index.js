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
      electionIds: {},
      elections: [],
      loadingElectoralEvent: true,
      loadingElections: true
    }
  }

  componentDidMount = async () => {
    await this.getElectoralRegister();
    this.getElectoralEvent();
    this.getElections();
  }

  getElectoralRegister = () => {
    this.setState({ loadingElectors: true })
    return new Promise((resolve, reject) => {
      electoralEventService.getElectoralRegister(this.state.electoralEventPublickey)
        .then(response => {
          response = response.map(elector => elector.electionsIds.split(','))
          response = [].concat.apply([], response);
          let electionIds = {};
          for (const electionId of response) {
            if (!electionIds[electionId])
              electionIds[electionId] = 0;
            electionIds[electionId]++;
          }
          resolve(this.setState({
            electionIds,
            loadingElectors: false
          }))
        })
        .catch(error => {
          console.log('error', error)
          this.setState({ loadingElectors: false })
        })
    })
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
        elections = elections.map(election => {
          election['numberElectoralRegister'] = this.state.electionIds[election.id];
          return election;
        })
        console.log('elections', elections);
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