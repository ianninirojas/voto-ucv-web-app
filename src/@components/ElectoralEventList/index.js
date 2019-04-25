import React, { Component } from 'react'

import {
  List,
  Icon,
  Tooltip
} from 'antd';

import { Link } from "react-router-dom";

import {
  nemAccountService,
  electoralEventService,
} from '../../@services';

import { Spinner } from '../../@components';

import { pathRoutes } from '../../@constans';

class ElectoralEventList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      electoralEvents: [],
      loadingElectoralEvents: true
    }
  }

  componentDidMount = () => {
    this.getElectoralEvents();
  }

  getElectoralEvents = () => {
    electoralEventService.getAll()
      .then(response => {
        let electoralEvents = [];
        for (const electoralEvent of response) {
          const publickey = nemAccountService.generatePublicKey(electoralEvent.name.toLowerCase());
          electoralEvent['publickey'] = publickey;
          electoralEvent['key'] = publickey;
          electoralEvents.push(electoralEvent)
        }
        this.setState({ electoralEvents, loadingElectoralEvents: false });
      })
  }

  render() {
    return (
      <div>
        {this.state.loadingElectoralEvents && (
          <Spinner color='white' />
        )}
        {!this.state.loadingElectoralEvents && (
          <div>
            <div className='text-center'>
              <span style={{ color: '#ffffff', fontSize: '30px' }} >Eventos Electorales</span>
            </div>
            <br />
            <List
              itemLayout="horizontal"
              dataSource={this.state.electoralEvents}
              renderItem={electoralEvent => (
                <List.Item key={electoralEvent.publickey}
                  actions={[
                    <Tooltip placement="top" title="Activo">
                      <Icon type='check' style={{ fontSize: '28px', color: electoralEvent.finished ? ('#ff0000') : (electoralEvent.active ? '#00b600' : '#000000') }} />
                    </Tooltip>,
                    <Tooltip placement="top" title="Finalizado">
                      <Icon type='stop' style={{ fontSize: '28px', color: electoralEvent.finished ? '#ff0000' : '#f5f5f5' }} />
                    </Tooltip>,
                    <Tooltip placement="top" title="Resultados">
                      <Link to={pathRoutes.RESULT.replace(':electoralEventPublickey', electoralEvent.publickey)}>
                        <Icon type='bar-chart' style={{ fontSize: '28px', color: '#00b600' }} />
                      </Link>
                    </Tooltip>
                  ]}>
                  <List.Item.Meta
                    title={<span style={{ color: '#ffffff', fontSize: '20px' }} >{electoralEvent.name}</span>}
                    description={<span style={{ color: '#ffffff', fontSize: '15px' }} >{electoralEvent.startDate} - {electoralEvent.endDate}</span>}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
    )
  }
}

export { ElectoralEventList };