import React, { Component } from 'react';
import { Button, Col, Row } from 'antd';
import { TypeCandidate } from '../../@constans';

import {
  CandidateUninominalResult,
  CandidatesListResult
} from "../../@components";
import { electionService } from '../../@services';
import { Spinner } from '../Spinner';

class ElectionResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: {},
      loadingResult: true
    }
  }

  componentDidMount = () => {
    this.getResult();
  }

  getResult = () => {
    electionService.getResult(this.props.electoralEventPublickey, this.props.election)
      .then(election => {
        this.setState({ election, loadingResult: false });
        this.numberVoters();
      })
      .catch(error => {
        console.log('error :', error);
        this.setState({ loadingResult: true });
      })
  }

  deselectElection = () => {
    this.props.deselectElection();
  }

  numberVoters = () => {
    let election = { ...this.state.election };
    if (election.typeCandidate === TypeCandidate.uninominal) {
      election['numberVoters'] = election.candidates.reduce((a, b) => a.votes + b.votes);
    }
    else if (election.typeCandidate === TypeCandidate.list) {
      let candidates = [...this.state.election.candidates];
      let candidatesByPosition = {};
      for (const candidate of candidates) {
        const position = candidate.position;
        if (!candidatesByPosition[position]) {
          candidatesByPosition[position] = [];
        }
        candidatesByPosition[position].push(candidate)
      }

      for (const position in candidatesByPosition) {
        const candidates = candidatesByPosition[position];
        candidatesByPosition[position]['votes'] = candidates.reduce((a, b) => a.votes + b.votes);
      }
      election['numberVoters'] = 0;
      for (const position in candidatesByPosition) {
        const candidates = candidatesByPosition[position];
        candidatesByPosition[position]['votes'] = candidates.reduce((a, b) => a.votes + b.votes);
        if (candidatesByPosition[position]['votes'] > election['numberVoters']) {
          election['numberVoters'] = candidatesByPosition[position]['votes']
        }
      }
    }
    this.setState({ election });
  }

  CandidateResult = () => {
    const election = { ...this.state.election }
    const typeCandidate = election.typeCandidate;
    let render = '';

    if (typeCandidate === TypeCandidate.uninominal) {
      render = <CandidateUninominalResult election={election} />
    }
    else if (typeCandidate === TypeCandidate.list) {
      render = <CandidatesListResult election={election} />
    }

    return render;
  }

  render() {
    const { CandidateResult } = this;
    const { election } = this.state;
    return (
      <div>
        {this.state.loadingResult && (
          <Spinner />
        )}
        {!this.state.loadingResult && (
          <Row>
            <h3> <span style={{ color: '#ff0000' }}> Resultados</span></h3>
            <h3><strong>Registro Electoral:</strong> {this.state.election.numberElectoralRegister}</h3>
            <h3><strong>Electores Participantes:</strong> {this.state.election.numberVoters}</h3>
            <Col xs={{ span: 21 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              <h3><strong>Elección:</strong> {election.name}</h3>
            </Col>
            <Col xs={{ span: 1 }} sm={{ span: 1, offset: 10 }} md={{ span: 1, offset: 10 }} lg={{ span: 1, offset: 10 }} xl={{ span: 1, offset: 10 }}>
              <Button icon='close' onClick={this.deselectElection} />
            </Col>
          </Row>
        )}
        {!this.state.loadingResult && (
          <Row>
            <CandidateResult />
          </Row>
        )}
      </div>
    );
  }
}

export { ElectionResult };