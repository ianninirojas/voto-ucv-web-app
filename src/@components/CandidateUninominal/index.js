import React, { Component } from 'react';

import {
  List,
  Card,
  Button,
  Modal
} from 'antd';

import candidateUninominal from '../../@assets/candidate-uninominal.png'

import selectedCandidateUninominal from '../../@assets/selected-candidate-uninominal.png'

const { Meta } = Card;
const confirm = Modal.confirm;

class CandidateUninominal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: this.props.election,
      position: this.props.election.candidates[0].position,
      selectedCandidate: this.props.election.selectedCandidate,
      bSelectedCandidate: this.props.election.selectedCandidate ? false : true
    }
  }

  onChangeCandidate = (candidate) => {
    this.setState({ selectedCandidate: candidate, bSelectedCandidate: false })
  }

  highlightSelectedCandidate = (candidate) => {
    return this.state.selectedCandidate ?
      (
        this.state.selectedCandidate.documentIdentity === candidate.documentIdentity ? { boxShadow: "0px 0px 10px 1px #52c41a" }
          :
          {}
      )
      :
      ({})
  }

  highlightImageSelectedCandidate = (candidate) => {
    const style = { padding: '10px', width: '200px', margin: 'auto' }
    return (
      this.state.selectedCandidate ?
        (
          this.state.selectedCandidate.documentIdentity === candidate.documentIdentity ?
            <img src={selectedCandidateUninominal} alt={candidate.name} style={style} />
            :
            <img src={candidateUninominal} alt={candidate.name} style={style} />
        )
        :
        (
          <img src={candidateUninominal} alt={candidate.name} style={style} />
        )
    )
  }

  confirmSelectCandidate = () => {
    const { selectedCandidate } = this.state;
    const _this = this;
    confirm({
      width:'500px',
      title: '¿Esta seguro de seleccionar este candidato?',
      content: `${selectedCandidate.name}`,
      okText: 'CONFIRMAR',
      okType: 'primary',
      cancelText: 'CANCELAR',
      onOk() {
        _this.selectCandidate();
      },
    });
  }

  selectCandidate = () => {
    const { election, selectedCandidate } = this.state;
    election['selectedCandidate'] = selectedCandidate;
    this.props.updateElection(election);
  }

  render() {
    return (
      <div>
        <h4><strong>Cargo:</strong> {this.state.position}</h4>
        <br />
        <List
          grid={{ gutter: 15, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
          dataSource={this.state.election.candidates}
          renderItem={(candidate) => (
            <List.Item key={candidate.documentIdentity}>
              <Card
                hoverable
                style={this.highlightSelectedCandidate(candidate)}
                onClick={() => { this.onChangeCandidate(candidate) }}
                cover={this.highlightImageSelectedCandidate(candidate)}
              >
                <Meta
                  style={{ textAlign: 'center' }}
                  title={candidate.name}
                />
              </Card>
            </List.Item>
          )}
        />
        <div className='text-center'>
          <Button
            type='primary'
            size='large'
            disabled={this.state.bSelectedCandidate}
            onClick={this.confirmSelectCandidate}
          >
            SELECCIONAR
          </Button>
        </div>
        <br /><br /><br />
      </div>
    );
  }
}

export { CandidateUninominal };