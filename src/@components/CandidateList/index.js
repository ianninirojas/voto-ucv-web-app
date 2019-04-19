import React, { Component } from 'react';

import {
  List,
  Card,
  Modal,
} from 'antd';

import candidateUninominal from '../../@assets/candidate-uninominal.png'

import selectedCandidateUninominal from '../../@assets/selected-candidate-uninominal.png'

const { Meta } = Card;

const confirm = Modal.confirm;

class CandidateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: this.props.candidates,
      position: this.props.candidates[0].position,
      selectedCandidate: this.props.selectedCandidate,
    }
  }

  onChangeCandidate = (candidate) => {
    this.setState({ selectedCandidate: candidate })
    this.props.onChangeCandidate(candidate);
  }

  highlightSelectedCandidate = (candidate) => {
    if (this.state.selectedCandidate)
    return this.state.selectedCandidate ?
      (
        this.state.selectedCandidate.identityDocument === candidate.identityDocument ? { boxShadow: "0px 0px 10px 1px #52c41a" }
          :
          {}
      )
      :
      ({})
  }

  highlightImageSelectedCandidate = (candidate) => {
    const style = { padding: '10px', width: '120px', margin: 'auto' }
    return (
      this.state.selectedCandidate ?
        (
          this.state.selectedCandidate.identityDocument === candidate.identityDocument ?
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
        <List
          grid={{ gutter: 15, xs: 1, sm: 1, md: 2, lg: 3, xl: 2, xxl: 5 }}
          dataSource={this.state.candidates}
          renderItem={(candidate) => (
            <List.Item key={candidate.identityDocument}>
              <Card
                hoverable
                style={this.highlightSelectedCandidate(candidate)}
                onClick={() => { this.onChangeCandidate(candidate) }}
                cover={this.highlightImageSelectedCandidate(candidate)}
              >
                <Meta
                  style={{ textAlign: 'center' }}
                  title={candidate.name}
                  description={candidate.listName}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export { CandidateList };