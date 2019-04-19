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

const FormItem = Form.Item;
const confirm = Modal.confirm;

class Access extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false,
      showForm: false,
      electoralEventPublickey: this.props.match.params.electoralEventPublickey,
      tokenAccess: this.props.match.params.tokenAccess,
      statusValidation: 'active',
      percentValidation: 0,
      electoralEvent: {},
      formatValidation: () => <span style={{ fontSize: '1.2em', color: '#ffffff' }}>Validando</span>
    }
  }

  componentDidMount = () => {
    this.accessVoter();
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

  accessVoter = () => {
    const tokenAccess = this.state.tokenAccess;
    const electoralEventPublickey = this.state.electoralEventPublickey;
    this.setState({
      loading: true
    });
    voterService.access(electoralEventPublickey, tokenAccess)
      .then(response => {
        this.setState({
          loading: false,
          statusValidation: 'success',
          percentValidation: 100,
          formatValidation: () => <span style={{ fontSize: '1.1em' }}>Acceso</span>
        });
        setTimeout(() => {
          if (parseInt(response.data.code) === 1) {
            this.setState({ newPassword: true, showForm: true })
          }
          else {
            this.setState({ newPassword: false, showForm: true })
          }
        }, 2000)
      })
      .catch(error => {
        error =
          <span>
            <span>{error}</span>
            <br />
            <span>Por favor, contacte a la comisión electoral</span>
          </span>

        this.setState({
          error: error,
          loading: false,
          statusValidation: 'exception',
          percentValidation: 100,
          formatValidation: () => <span style={{ fontSize: '1.1em' }}>Error</span>
        });
      })
  }

  handleSubmit = () => {
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
              _this.login(values);
            },
          });
        }
        else {
          _this.login(values);
        }
      }
    });
  }

  login = (values) => {
    this.setState({ loading: true });
    voterService.login(this.state.electoralEventPublickey, values.password)
      .then(elections => {
        this.props.history.push({
          pathname: pathRoutes.BALLOT.replace(':electoralEventPublickey', this.state.electoralEventPublickey),
          state: { elections }
        });
      })
      .catch(error => {
        console.log('error :', error);
        this.setState({
          error,
          loading: false
        });
      })
  }

  showModalConfirm = () => {
    const _this = this;
    _this.handleSubmit();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Contraseña no coincide');
    } else {
      callback();
    }
  }

  RenderForm = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='access-box text-center'>
        <Col
          xs={20}
          sm={20}
          md={11}
          lg={8}
          xl={8}
        >
          <Form onSubmit={this.handleSubmit}>
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
        </Col>
      </div>
    );
  }

  ProgressValidation = () => {
    return (
      <div>
        <Progress type='circle' width='110px' percent={this.state.percentValidation} format={this.state.formatValidation} status={this.state.statusValidation} />
        <br /><br />
        {this.state.statusValidation === 'success' && (
          <span >
            <h3 data-text="Cargando..." style={{ color: '#ffffff' }}>Cargando...</h3>
          </span>
        )}

        {this.state.statusValidation === 'exception' && (
          <h2 style={{ color: '#ffffff' }}>{this.state.error}</h2>
        )}
      </div>
    )
  }

  render() {
    const { RenderForm, ProgressValidation } = this;
    return (
      <div>
        <div className='text-center'>
          <h2 style={{ color: '#ffffff' }}>Evento Electoral</h2>
          <h3 style={{ color: '#ffffff' }}>{this.state.electoralEvent.name}</h3>
        </div>
        <br />
        {this.state.showForm ? (
          <RenderForm />
        ) : (
            <div className='text-center' style={{ paddingTop: '50px' }}>
              <ProgressValidation />
            </div>
          )}
      </div>
    );
  }
}

const AccessForm = Form.create({ name: 'auth-form' })(Access);

export { AccessForm };