import React, { Component } from 'react';
import { CandidateListResult } from '../../@components';
import { Collapse, Icon, Modal } from 'antd';

const Panel = Collapse.Panel;

const confirm = Modal.confirm;

const customPanelStyle = {
  background: 'none',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

class CandidatesListResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: this.props.election,
    }
  }

  RenderCandidates = () => {
    let candidates = [...this.state.election.candidates];
    let candidatesByPosition = {};
    for (const candidate of candidates) {
      const position = candidate.position;
      if (!candidatesByPosition[position]) {
        candidatesByPosition[position] = [];
      }
      candidatesByPosition[position].push(candidate)
    }
    let render = [];
    for (const position in candidatesByPosition) {
      if (candidatesByPosition.hasOwnProperty(position)) {
        const candidates = candidatesByPosition[position];
        render.push(
          <Panel header={<h3 style={{ marginBottom: '0px' }}>{position}</h3>} key={position} style={customPanelStyle}>
            <CandidateListResult candidates={candidates} key={position} />
          </Panel>
        );
      }
    }

    return (
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
      >
        {render}
      </Collapse>
    );
  }

  render() {
    const { RenderCandidates } = this;
    return (
      <div>
        <RenderCandidates />
      </div>
    );
  }
}

export { CandidatesListResult };