import React, { Component } from 'react'

import { Spinner } from '../../@components';

import { voterService } from '../../@services';

import { pathRoutes } from '../../@constans';


class CheckToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
      electoralEventPublickey: this.props.match.params.electoralEventPublickey,
      loading: true
    }
  }

  componentDidMount = () => {
    voterService.createCurrentVoter(this.state.token);
    if (voterService.getTypeCode() === 'auth') {
      this.props.history.push(pathRoutes.AUTH.replace(':electoralEventPublickey', this.state.electoralEventPublickey));
    }
    else if (voterService.getTypeCode() === 'access') {
      this.props.history.push(pathRoutes.ACCESS.replace(':electoralEventPublickey', this.state.electoralEventPublickey));
    }
    else {
      voterService.removeCurrentVoter();
      this.props.history.push(pathRoutes.ELECTORALEVENTS);
    }
  }

  render() {
    return (
      <div>
        <Spinner color='white'/>
      </div>
    )
  }
}

export { CheckToken }
