import React, { Component } from 'react'

import {
  Icon,
  Form,
  Modal,
  Alert,
  Input,
  Button,
} from 'antd';

import {
  voterService,
  electoralEventService
} from '../../@services';

import { pathRoutes } from '../../@constans';

import './style.css';
import { Spinner } from '../Spinner';

const FormItem = Form.Item;
const confirm = Modal.confirm;

const LoginForm = Form.create()(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: '',
        loadingElectoralEvent: true,
        electoralEventPublickey: this.props.match.params.electoralEventPublickey,
        electoralEvent: {},
        newPassword: this.props.location.state.newPassword
      }
    }

    componentDidMount = () => {
      this.getElectoralEvent();
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

    handleSubmit = (e) => {
      const _this = this;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (_this.state.newPassword) {
            confirm({
              width: '500px',
              title: '¿Esta seguro de utilizar esta contraseña?',
              content: 'Será usada al momento de emitir el voto',
              okText: 'Si',
              okType: 'primary',
              cancelText: 'No',
              onOk() {
                _this.login(values, e);
              },
            });
          }
          else {
            _this.login(values, e);
          }
        }
      });
    }

    login = (values, e) => {
      e.preventDefault();
      this.setState({ loading: true });
      voterService.login(this.state.electoralEventPublickey, values.password)
        .then(elections => {
          this.props.history.push({
            pathname: pathRoutes.BALLOT.replace(':electoralEventPublickey', this.state.electoralEventPublickey),
            state: { elections }
          });
        })
        .catch(error => {
          this.setState({
            error,
            loading: false
          });
        })
    }

    showModalConfirm = (e) => {
      const _this = this;
      _this.handleSubmit(e);
    }

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Contraseña no coincide');
      } else {
        callback();
      }
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          {this.state.loadingElectoralEvent && (
            <Spinner color='white'/>
          )}

          {!this.state.loadingElectoralEvent && (
            <div>
              <div className='text-center'>
                <h2 style={{ color: '#ffffff' }}>Evento Electoral</h2>
                <h3 style={{ color: '#ffffff' }}>{this.state.electoralEvent.name}</h3>
              </div>
              <Form onSubmit={this.handleSubmit} className='login-form'>
                {/* PASSWORD */}
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Requerido' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
                  )}
                </FormItem>
                {/* PASSWORD */}

                {/* VERIFY PASSWORD */}
                {this.state.newPassword && (
                  <FormItem>
                    {getFieldDecorator('verifyPassword', {
                      rules: [
                        { required: true, message: 'Requerido' },
                        { validator: this.compareToFirstPassword }
                      ],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Repita contraseña" />
                    )}
                  </FormItem>
                )}
                {/* VERIFY PASSWORD */}

                {/* API ERROR */}
                {this.state.error !== '' && (
                  <FormItem>
                    <Alert message={this.state.error} type='error' />
                  </FormItem>
                )}
                {/* API ERROR */}

                <FormItem>
                  <span className='text-center'>
                    <Button
                      block
                      type="primary"
                      size='large'
                      onClick={this.showModalConfirm}
                      loading={this.state.loading}
                    >
                      Iniciar
                </Button>
                  </span>
                </FormItem>
              </Form>
            </div >
          )}
        </div>
      )
    }
  }
)

export { LoginForm }