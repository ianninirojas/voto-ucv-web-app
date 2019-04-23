import React, { Component } from 'react';

import { AuthForm } from '../../@components';
class Auth extends Component {

  render() {
    return <AuthForm {...this.props} />;
  }
}

export { Auth };