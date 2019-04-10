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
} from 'antd';

import { Election } from "../../@components";

import candidateUninominal from '../../@assets/candidate-uninominal.png'

import selectedCandidateUninominal from '../../@assets/selected-candidate-uninominal.png'

import candidatesList from '../../@assets/candidates-list.png'

import selectedCandidatesList from '../../@assets/selected-candidates-list.png'

import { TypeCandidate } from '../../@constans';

import './style.css'
import { voterService } from '../../@services';

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
      elections: [],
      electionSelected: {},
      loadingElections: true,
      showElection: false,
      bButtonVote: true,
      visible: false
    }
  }

  componentDidMount = () => {
    this.getElections();
  }

  getElections = () => {
    const elections = [
      {
        id: '31f18g1bvi1917v',
        name: 'Decano',
        type: 'Eleccion de Decano',
        levelElection: 'universidad',
        typeCandidate: 'uninominal',
        typeElector: 'todos',
        facultyId: '00',
        schoolId: '00',
        allowedVotes: '1',
        period: '2019-2025',
        candidates: [
          { name: 'Yunelis Jimenez', documentIdentity: 20653996, position: 'Rector' },
          { name: 'Jose Iannini', documentIdentity: 24276962, position: 'Rector' }
        ]
      },
      {
        id: '13g18vh19b3vu1',
        name: 'Centro de Estudiante de Computacion',
        type: 'Centro de Estudiante',
        levelElection: 'escuela',
        typeCandidate: 'lista',
        typeElector: 'estudiante',
        facultyId: '12',
        schoolId: '14',
        allowedVotes: '12',
        period: '2019-2020',
        candidates: [
          { name: 'Yunelis Jimenez', documentIdentity: 20653996, position: 'Presidente', list: 'Cluster' },
          { name: 'Fran Jimenez', documentIdentity: 20653997, position: 'Cultura', list: 'Cluster' },
          { name: 'Yune Herrera', documentIdentity: 20653998, position: 'Deporte', list: 'Cluster' },
          { name: 'Jose Iannini', documentIdentity: 24276962, position: 'Presidente', list: 'PC1' },
          { name: 'Francisco Rojas', documentIdentity: 24276961, position: 'Cultura', list: 'PC1' },
          { name: 'Jose Herrera', documentIdentity: 20653999, position: 'Deporte', list: 'PC1' },
        ]
      },
    ];
    this.setState({ elections, loadingElections: false });
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
    voterService.vote(this.state.electoralEventPublickey, this.state.elections, password)
      .then(response => {

      })
      .catch(error => {

      })
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.vote(values.password);
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
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
                <h3>Escoja la elección en la que desea participar</h3>
                <List
                  loading={this.state.loadingElections}
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
        <PasswordForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div >
    );
  }
}

export { Elections };