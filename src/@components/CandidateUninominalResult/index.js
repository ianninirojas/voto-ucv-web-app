import React, { Component } from 'react';

import {
  List,
  Card,
} from 'antd';

import candidateUninominal from '../../@assets/candidate-uninominal.png'

const { Meta } = Card;

class CandidateUninominalResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: this.props.election,
      position: this.props.election.candidates[0].position,
      selectedCandidate: this.props.election.selectedCandidate,
      bSelectedCandidate: this.props.election.selectedCandidate ? false : true
    }
  }

  coverImageCandidate = (candidate) => {
    const style = { padding: '10px', width: '200px', margin: 'auto' }
    return <img src={candidateUninominal} alt={candidate.name} style={style} />
  }

  render() {
    return (
      <div>
        <h4><strong>Cargo:</strong> {this.state.position}</h4>
        <br />
        <List
          grid={{ gutter: 15, xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
          dataSource={this.state.election.candidates}
          renderItem={(candidate) => (
            <List.Item key={candidate.identityDocument}>
              <Card
                cover={this.coverImageCandidate(candidate)}
              >
                <Meta
                  style={{ textAlign: 'center' }}
                  title={candidate.name}
                  description={`Votos: ${candidate.votes}`}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export { CandidateUninominalResult };