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
			bElectoralEventActive: this.props.electoralEvent.active,
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
				{!this.state.showElection && (
					<div>
						<h3>Escoja la elección que desea ver resultados</h3>
						<List
							grid={{ gutter: 15, xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
							dataSource={this.state.elections}
							renderItem={(election) => (
								<List.Item key={election.id}>
									<Card
										cover={this.coverImageElection(election)}
										actions={[<Button type='primary' disabled={!this.state.bElectoralEventActive} style={{ borderRadius: '0px', height: '100%' }} block onClick={() => { this.showSelectedElection(election) }}>RESULTADOS</Button>]}
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
			</div >
		);
	}
}

export { ElectionResults };