import React, { Component } from 'react';

import {
  Form,
  Icon,
  Input,
  Alert,
  Button,
  Modal,
  Progress,
  Col,
} from 'antd';

import { voterService, electoralEventService } from "../../@services";
import { pathRoutes } from '../../@constans';

import './style.css'



class Access extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false,
      electoralEventPublickey: this.props.match.params.electoralEventPublickey,
      statusValidation: 'active',
      percentValidation: 0,
      electoralEvent: {},
      formatValidation: () => <span style={{ fontSize: '1.2em', color: '#ffffff' }}>Validando</span>
    }
  }

  componentDidMount = () => {
    this.getElectoralEvent();
    this.accessVoter();
  }

  getElectoralEvent = () => {
    electoralEventService.get(this.state.electoralEventPublickey)
      .then(electoralEvent => {
        this.setState({ electoralEvent, loadingElectoralEvent: false });
      })
      .catch(error => {
        console.log('error :', error);
      })
  }

  accessVoter = () => {
    const electoralEventPublickey = this.state.electoralEventPublickey;
    this.setState({
      loading: true
    });
    voterService.access(electoralEventPublickey)
      .then(response => {
        this.setState({
          loading: false,
          statusValidation: 'success',
          percentValidation: 100,
          formatValidation: () => <span style={{ fontSize: '1.1em' }}>Acceso</span>
        });
        setTimeout(() => {
          let newPassword;
          if (parseInt(response.data.code) === 1) {
            newPassword = true
          }
          else {
            newPassword = false
          }
          this.props.history.push({
            pathname: pathRoutes.LOGIN.replace(':electoralEventPublickey', this.state.electoralEventPublickey),
            state: { newPassword }
          });
        }, 2000)
      })
      .catch(error => {
        console.log('error :', error);
        error =
          <span>
            <span>{error}</span>
            <br />
            <span>Por favor, contacte a la comisión electoral</span>
          </span>

        voterService.removeCurrentVoter();
        this.setState({
          error: error,
          loading: false,
          statusValidation: 'exception',
          percentValidation: 100,
          formatValidation: () => <span style={{ fontSize: '1.1em' }}>Error</span>
        });
      })
  }

  ProgressValidation = () => {
    return (
      <div>
        <Progress type='circle' width='110px' percent={this.state.percentValidation} format={this.state.formatValidation} status={this.state.statusValidation} />
        <br /><br />
        {this.state.statusValidation === 'success' && (
          <h3 data-text="Cargando..." style={{ color: '#ffffff' }}>Cargando...</h3>
        )}

        {this.state.statusValidation === 'exception' && (
          <h2 style={{ color: '#ffffff' }}>{this.state.error}</h2>
        )}
      </div>
    )
  }

  render() {
    const { ProgressValidation } = this;
    return (
      <div>
        <div className='text-center'>
          <h2 style={{ color: '#ffffff' }}>Evento Electoral</h2>
          <h3 style={{ color: '#ffffff' }}>{this.state.electoralEvent.name}</h3>
        </div>
        <div className='text-center' style={{ paddingTop: '10px' }}>
          <ProgressValidation />
        </div>
      </div>
    );
  }
}

const AccessForm = Form.create({ name: 'auth-form' })(Access);

export { AccessForm };