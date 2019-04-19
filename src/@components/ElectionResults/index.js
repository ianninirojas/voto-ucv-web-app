import React, { Component } from 'react';

import {
	Col,
	Row,
	List,
	Card,
	Button,
} from 'antd';

import { ElectionResult } from "../../@components";

import candidateUninominal from '../../@assets/candidate-uninominal.png'

import candidatesList from '../../@assets/candidates-list.png'

import { TypeCandidate } from '../../@constans';

// import './style.css'

const { Meta } = Card;

class ElectionResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			electoralEventPublickey: this.props.electoralEventPublickey,
			elections: this.props.elections,
			electionSelected: {},
			showElection: false,
			bButtonVote: true,
			visible: false
		}
	}

	showSelectedElection = (electionSelected) => {
		this.setState({
			showElection: !this.state.showElection,
			electionSelected
		})
	}

	deselectElection = () => {
		this.setState({
			showElection: !this.state.showElection,
			electionSelected: {}
		})
	}

	coverImageElection = (election) => {
		const style = { padding: '10px', width: '200px', margin: 'auto' }
		if (election.typeCandidate === TypeCandidate.uninominal) {
			return <img src={candidateUninominal} alt={election.name} style={style} />
		}
		else if (election.typeCandidate === TypeCandidate.list) {
			return <img src={candidatesList} alt={election.name} style={style} />
		}
	}

	render() {
		return (
			<div>
				<Row>
					<Col
						xs={{ span: 22, offset: 1 }}
						sm={{ span: 22, offset: 1 }}
						md={{ span: 22, offset: 1 }}
						lg={{ span: 23, offset: 1 }}
						xl={{ span: 23, offset: 1 }}
					>
						{!this.state.showElection && (
							<div>
								<h3>Escoja la elección que desea ver resultados</h3>
								<List
									grid={{ gutter: 15, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
									dataSource={this.state.elections}
									renderItem={(election) => (
										<List.Item key={election.id}>
											<Card
												cover={this.coverImageElection(election)}
												actions={[<Button type='primary' style={{ borderRadius: '0px', height: '100%' }} block onClick={() => { this.showSelectedElection(election) }}>RESULTADOS</Button>]}
											>
												<Meta
													style={{ textAlign: 'center' }}
													title={election.name}
												/>
											</Card>
										</List.Item>
									)}
								/>
							</div>
						)}

						{this.state.showElection && (
							<div>
								<ElectionResult
									election={this.state.electionSelected}
									electoralEventPublickey={this.state.electoralEventPublickey}
									deselectElection={this.deselectElection}
								/>
							</div>
						)}
					</Col>
				</Row>
			</div >
		);
	}
}

export { ElectionResults };