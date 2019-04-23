import React, { Component } from 'react';

import {
  List,
  Card,
} from 'antd';

import candidateUninominal from '../../@assets/candidate-uninominal.png'

const { Meta } = Card;

class CandidateListResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: this.props.candidates,
      position: this.props.candidates[0].position,
      selectedCandidate: this.props.selectedCandidate,
    }
  }

  coverImageCandidate = (candidate) => {
    const style = { padding: '10px', width: '120px', margin: 'auto' }
    return <img src={candidateUninominal} alt={candidate.name} style={style} />
  }

  render() {
    return (
      <div>
        <List
          grid={{ gutter: 15, xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
          dataSource={this.state.candidates}
          renderItem={(candidate) => (
            <List.Item key={candidate.identityDocument}>
              <Card
                cover={this.coverImageCandidate(candidate)}
              >
                <Meta
                  style={{ textAlign: 'center' }}
                  title={candidate.name}
                  description={<div><p>{candidate.listName}</p><p>Votos: {candidate.votes}</p></div>}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export { CandidateListResult };