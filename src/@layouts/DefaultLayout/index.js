import React, { Component } from 'react';

import { Layout } from "antd";

import { Header, Content, Footer } from "../../@components";

class DefaultLayout extends Component {

  RenderLayout = () => {
    return (
      <Layout>
        <Layout>
          <Header />
          <Content />
          <Footer />
        </Layout>
      </Layout>
    )
  }

  render() {
    const { RenderLayout } = this
    return (
      <RenderLayout />
    );
  }
}

export { DefaultLayout };