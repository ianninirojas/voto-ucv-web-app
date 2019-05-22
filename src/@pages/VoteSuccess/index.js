import React, { Component } from 'react';

import {
	Progress,
	Icon,
	Button
} from "antd";

import { Link } from "react-router-dom";

import { pathRoutes } from '../../@constans';

import { voterService } from '../../@services';

class VoteSuccess extends Component {

	componentDidMount = () => {
		voterService.removeCurrentVoter();
	}

	render() {
		return (
			<div>
				<div className='text-center' style={{ paddingTop: '20px' }}>
					<Progress type='circle' width='110px' percent={100} format={() => <Icon type='check' style={{ fontSize: '3em' }} />} status='success' />
				</div>
				<div className='text-center' style={{ paddingTop: '40px', paddingRight: '50px', paddingLeft: '50px' }}>
					<h2 style={{ color: "#ffffff" }}>Su voto ha sido transmitido con éxito</h2>
				</div>
			</div >
		);
	}
}

export { VoteSuccess };