import React, { Component } from 'react';

import {
  Progress
} from 'antd';

import { voterService } from "../../@services";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false,
      electoralEventPublickey: this.props.match.params.electoralEventPublickey,
      tokenAuth: this.props.match.params.tokenAuth,
      statusValidation: 'active',
      percentValidation: 0,
      formatValidation: () => <span style={{ fontSize: '1.2em', color: '#ffffff' }}>Validando</span>
    }
  }

  componentDidMount = () => {
    this.authVoter()
  }

  authVoter = () => {
    const tokenAuth = this.state.tokenAuth;
    const electoralEventPublickey = this.state.electoralEventPublickey;
    this.setState({
      loading: true
    });
    voterService.auth(electoralEventPublickey, tokenAuth)
      .then(_ => {
        this.setState({
          loading: false,
          statusValidation: 'success',
          percentValidation: 100,
          formatValidation: () => <span style={{ fontSize: '1.1em' }}>Autenticado</span>
        });
      })
      .catch(error => {
        error =
          <span>
            <span>{error}</span>
            <br />
            <span>Por favor, contacte a la comisión electoral</span>
          </span>

        setTimeout(() => {
          this.setState({
            error: error,
            loading: false,
            statusValidation: 'exception',
            percentValidation: 100,
            formatValidation: () => <span style={{ fontSize: '1.1em' }}>Error</span>
          });
        }, 4000)
      })
  }

  ProgressValidation = () => {
    return <Progress type='circle' width='110px' percent={this.state.percentValidation} format={this.state.formatValidation} status={this.state.statusValidation} />
  }

  MessageValidation = () => {
    if (this.state.statusValidation === 'success') {
      return (
        <span >
          <h2 style={{ color: '#ffffff' }}>Se ha enviado un código de acceso a su correo</h2>
        </span>
      )
    }
    else if (this.state.statusValidation === 'exception') {
      return (<h2 style={{ color: '#ffffff' }}>{this.state.error}</h2>)
    }
    else {
      return '';
    }
  }

  render() {
    const { ProgressValidation, MessageValidation } = this;
    return (
      <div className='text-center'>
        <ProgressValidation />
        <br /><br />
        <MessageValidation />
      </div>
    );
  }
}

export { AuthForm };