import React, { Component } from 'react';

import {
	Progress,
	Icon
} from "antd";

import { voterService } from '../../@services';

class Timeout extends Component {

	componentDidMount = () => {
		voterService.removeCurrentVoter();
	}

	render() {
		return (
			<div>
				<div className='text-center'>
					<Progress type='circle' width='90px' percent={100} format={() => <Icon type='close' style={{ fontSize: '3em' }} />} status='exception' />
				</div>
				<div className='text-center' style={{ padding: '30px 30px' }}>
					<h2 style={{ color: "#ffffff" }}>Se acabó el tiempo</h2>
					{/* <h3 style={{ color: "#ffffff" }}>Por favor, para continuar con la votación ingrese nuevamente</h3>
					<h3 style={{ color: "#ffffff" }}>al link del correo <strong>"Autorización Evento Electoral"</strong></h3> */}

					<h3 style={{ color: "#ffffff" }}>
						<span>Por favor, para continuar con la votación</span>
						<br />
						<span> ingrese nuevamente al link del correo </span>
						<br /><br />
						<strong>"Autorización Evento Electoral"</strong>
					</h3>
				</div>
			</div>
		);
	}
}

export { Timeout };