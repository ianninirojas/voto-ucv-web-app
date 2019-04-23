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
      election: [],
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
      })
      .catch(error => {
        console.log('error :', error);
        this.setState({ loadingResult: true });
      })
  }

  deselectElection = () => {
    this.props.deselectElection();
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