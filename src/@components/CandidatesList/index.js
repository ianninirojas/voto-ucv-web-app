import React, { Component } from 'react';
import { CandidateList } from '../CandidateList';
import { Button, Collapse, Icon, Modal } from 'antd';

const Panel = Collapse.Panel;

const confirm = Modal.confirm;

const customPanelStyle = {
  background: 'none',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

class CandidatesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: this.props.election,
      selectedCandidates: this.props.election.selectedCandidate ? this.props.election.selectedCandidate : [],
    }
  }

  componentDidMount = () => {
    this.separatePosition();
  }

  separatePosition = () => {
    let candidates = [...this.state.election.candidates];
    let candidatesByPosition = {};
    for (const candidate of candidates) {
      const position = candidate.position;
      if (!candidatesByPosition[position]) {
        candidatesByPosition[position] = [];
      }
      candidatesByPosition[position].push(candidate)
    }
  }

  onChangeCandidate = (newCandidate) => {
    const position = newCandidate.position;
    let selectedCandidates = [...this.state.selectedCandidates];
    const candidateteIndex = selectedCandidates.findIndex(candidate => candidate.position === position)
    if (candidateteIndex !== -1) {
      selectedCandidates[candidateteIndex] = newCandidate;
    }
    else {
      selectedCandidates.push(newCandidate);
    }
    this.setState({ selectedCandidates });
  }

  selectedCandidateByPostion = (position) => {
    if (this.state.selectedCandidates)
      return this.state.selectedCandidates.find(candidate => candidate.position === position);
    else
      return undefined;
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
            <CandidateList candidates={candidates} key={position} onChangeCandidate={this.onChangeCandidate} selectedCandidate={this.selectedCandidateByPostion(position)} />
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

  confirmSelectCandidates = () => {
    const { selectedCandidates } = this.state;
    let candidatesName = selectedCandidates.map(candidate => (
      <li key={candidate.position}><strong>{candidate.position}</strong>: {candidate.name}</li>
    ));

    let candidates = [...this.state.election.candidates];

    let positions = []
    for (const candidate of candidates) {
      if (!positions.includes(candidate.position)) {
        positions.push(candidate.position);
      }
    }

    const unselectedPositions = positions.map(position => {
      if (!selectedCandidates.find(candidate => candidate.position === position)) {
        return <li style={{ color: '#ff0000' }} key={position}><strong>{position}</strong>: NO SELECCIONADO</li>
      }
    })

    candidatesName = candidatesName.concat(unselectedPositions);

    const _this = this;
    confirm({
      width: '500px',
      title: '¿Esta seguro de seleccionar estos candidatos?',
      content: <ul> {candidatesName.map(candidate => candidate)}</ul >,
      okText: 'CONFIRMAR',
      okType: 'primary',
      cancelText: 'CANCELAR',
      onOk() {
        _this.selectCandidate();
      },
    });
  }

  selectCandidate = () => {
    const { election, selectedCandidates } = this.state;
    election['selectedCandidate'] = selectedCandidates;
    this.props.updateElection(election);
  }

  render() {
    const { RenderCandidates } = this;
    return (
      <div>
        <h4>Escoja los candidatos de su preferencia</h4>
        <RenderCandidates />
        <div className='text-center'>
          <Button
            type='primary'
            size='large'
            // disabled={this.state.bSelectedCandidate}
            onClick={this.confirmSelectCandidates}
          >
            SELECCIONAR
          </Button>
        </div>
        <br /><br /><br />
      </div>
    );
  }
}

export { CandidatesList };