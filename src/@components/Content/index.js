import React, { Component } from 'react';

import { Layout } from "antd";

import { Routes } from "../../@config";

class Content extends Component {

  render() {
    return (
      <Layout.Content>
        <Routes />
      </Layout.Content>
    );
  }
}

export { Content };