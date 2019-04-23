import React, { Component } from 'react';

import { AccessForm } from '../../@components';
class Access extends Component {

  render() {
    return <AccessForm {...this.props} />;
  }
}

export { Access };