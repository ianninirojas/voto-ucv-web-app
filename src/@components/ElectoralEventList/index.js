import React, { Component } from 'react'

import {
  List,
  Skeleton,
  Button,
  Avatar,
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
          const publickey = nemAccountService.generatePublicKey(electoralEvent.data.name.toLowerCase());
          electoralEvent.data['publickey'] = publickey;
          electoralEvent.data['key'] = publickey;
          electoralEvents.push(electoralEvent.data)
        }
        this.setState({ electoralEvents, loadingElectoralEvents: false });
      })
  }

  render() {
    return (
      <div>
        {this.state.loadingElectoralEvents && (
          <Spinner color='white'/>
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
                    <Tooltip placement="right" title="Resultados">
                      <Link to={pathRoutes.RESULT.replace(':electoralEventPublickey', electoralEvent.publickey)}>
                        <Icon type='bar-chart' style={{ fontSize: '30px', color: '#00b600' }} />
                      </Link>
                    </Tooltip>
                  ]}>
                  <List.Item.Meta
                    title={<span style={{ color: '#ffffff', fontSize: '18px' }} >{electoralEvent.name}</span>}
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