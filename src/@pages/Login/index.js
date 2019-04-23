import React, { Component } from 'react';

import { LoginForm } from '../../@components';

class Login extends Component {
  render() {
    return <LoginForm {...this.props} />;
  }
}

export { Login };