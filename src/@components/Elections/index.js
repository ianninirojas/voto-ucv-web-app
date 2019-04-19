import React, { Component } from 'react';

import {
  Col,
  Row,
  List,
  Card,
  Icon,
  Modal,
  Button,
  Form,
  Input,
  message,
} from 'antd';

import { Election, Spinner } from "../../@components";

import { TypeCandidate } from '../../@constans';

import { voterService } from '../../@services';

import candidateUninominal from '../../@assets/candidate-uninominal.png'

import selectedCandidateUninominal from '../../@assets/selected-candidate-uninominal.png'

import candidatesList from '../../@assets/candidates-list.png'

import selectedCandidatesList from '../../@assets/selected-candidates-list.png'

import './style.css'

const { Meta } = Card;

const confirm = Modal.confirm;

const PasswordForm = Form.create()(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Contraseña"
          okText="CONFIRMAR"
          cancelText="CANCELAR"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" className='text-center'>
            <Form.Item >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Requerido' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class Elections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electoralEventPublickey: this.props.electoralEventPublickey,
      elections: this.props.elections,
      electionSelected: {},
      showElection: false,
      bButtonVote: true,
      visible: false,
      loadingVote: false
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

  updateElection = (newElection) => {
    let elections = [...this.state.elections];
    const electionIndex = elections.findIndex(election => election.id === newElection.id);
    elections[electionIndex] = { ...newElection };
    this.setState({ elections, bButtonVote: false });
    this.deselectElection();
  }

  highlightImageSelectedCandidate = (election) => {
    const style = { padding: '10px', width: '200px', margin: 'auto' }

    if (election.typeCandidate === TypeCandidate.uninominal) {
      return (
        election.selectedCandidate ?
          <img src={selectedCandidateUninominal} alt={election.name} style={style} />
          :
          <img src={candidateUninominal} alt={election.name} style={style} />
      )
    }
    else if (election.typeCandidate === TypeCandidate.list) {
      return (
        election.selectedCandidate ?
          <img src={selectedCandidatesList} alt={election.name} style={style} />
          :
          <img src={candidatesList} alt={election.name} style={style} />
      )
    }
  }

  textButtonSelectCandidate = (election) => {
    return (
      election.selectedCandidate ?
        'CAMBIAR CANDIDATO'
        :
        'SELECCIONAR CANDIDATO'
    )
  }

  confirmVote = () => {
    const { elections } = this.state;
    let electionsList = [];
    let selectedElections = elections.map(election => {
      if (election.hasOwnProperty('selectedCandidate')) {
        return <li key={election.name}><strong>{election.name}</strong></li>
      }
    });

    if (selectedElections.length > 0) {
      electionsList = electionsList.concat(selectedElections);
    }

    let unselectedElections = elections.map(election => {
      if (!election.hasOwnProperty('selectedCandidate')) {
        return <li style={{ color: '#ff0000' }} key={election.name}><strong>{election.name}</strong></li>
      }
    });
    if (unselectedElections.length > 0) {
      electionsList = electionsList.concat(unselectedElections);
    }

    const _this = this;
    confirm({
      width: '500px',
      title: '¿Esta seguro de participar en estas elecciones?',
      content: <ul> {electionsList.map(election => election)}</ul >,
      okText: 'CONFIRMAR',
      okType: 'primary',
      cancelText: 'CANCELAR',
      onOk() {
        _this.showModalPassword()
      },
    });
  }

  showModalPassword = () => {
    this.setState({ visible: true });
  }

  vote = (password) => {
    this.setState({ visible: false, bButtonVote: true, loadingVote: true });
    voterService.vote(this.state.electoralEventPublickey, this.state.elections, password)
      .then(response => {
        message.success(response);
      })
      .catch(error => {
        console.log('error :', error);
        this.setState({ bButtonVote: false, loadingVote: false });
        message.success('error');
      })
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  confirmPassword = (e) => {
    e.preventDefault();
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.vote(values.password);
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div>
        {this.state.loadingVote && (
          <Spinner>
            <p>Esto puede tomar un rato...</p>
          </Spinner>
        )}

        {!this.state.loadingVote && (
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
                  <h3>Escoja la elección en la que desea participar</h3>
                  <List
                    grid={{ gutter: 15, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
                    dataSource={this.state.elections}
                    renderItem={(election) => (
                      <List.Item key={election.id}>
                        <Card
                          cover={this.highlightImageSelectedCandidate(election)}
                          actions={[<Button type='primary' style={{ borderRadius: '0px', height: '100%' }} block onClick={() => { this.showSelectedElection(election) }}>{this.textButtonSelectCandidate(election)}</Button>]}
                        >
                          <Meta
                            style={{ textAlign: 'center' }}
                            title={election.name}
                          />
                        </Card>
                      </List.Item>
                    )}
                  />
                  <br />
                  <div className='text-center'>
                    <Button
                      type='primary'
                      size='large'
                      onClick={this.confirmVote}
                      disabled={this.state.bButtonVote}
                    >
                      VOTAR
                </Button>
                  </div>
                </div>
              )}

              {this.state.showElection && (
                <div>
                  <Election
                    election={this.state.electionSelected}
                    deselectElection={this.deselectElection}
                    updateElection={this.updateElection}
                  />
                </div>
              )}
            </Col>
          </Row>
        )}
        <PasswordForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.confirmPassword}
        />
      </div >
    );
  }
}

export { Elections };