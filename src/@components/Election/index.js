import React, { Component } from 'react';
import { Button, Col, Row } from 'antd';
import { TypeCandidate } from '../../@constans';

import {
  CandidateUninominal,
  CandidatesList
} from "../../@components";

class Election extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: this.props.election
    }
  }

  deselectElection = () => {
    this.props.deselectElection();
  }

  Candidate = () => {
    const election = { ...this.state.election }
    const typeCandidate = election.typeCandidate;
    let render = '';

    if (typeCandidate === TypeCandidate.uninominal) {
      render = <CandidateUninominal election={election} updateElection={this.props.updateElection} />
    }
    else if (typeCandidate === TypeCandidate.list) {
      render = <CandidatesList election={election} updateElection={this.props.updateElection} />
    }

    return render;
  }

  render() {
    const { Candidate } = this;
    const { election } = this.state;
    return (
      <div>
        <Row>
          <Col xs={{ span: 22 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
            <h3><strong>Elección:</strong> {election.name}</h3>
          </Col>
          <Col xs={{ span: 1 }} sm={{ span: 1, offset: 10 }} md={{ span: 1, offset: 10 }} lg={{ span: 1, offset: 10 }} xl={{ span: 1, offset: 10 }}>
            <Button icon='close' onClick={this.deselectElection} />
          </Col>
        </Row>
        <Row>
          <Candidate />
        </Row>
      </div>
    );
  }
}

export { Election };