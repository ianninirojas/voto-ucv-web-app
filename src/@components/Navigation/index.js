import React, { Component } from 'react';

import { Router, Route } from 'react-router-dom';

import { history } from "../../@helpers";

import { pathRoutes } from '../../@constans';

import {
  Auth,
  Access,
  Ballot
} from '../../@pages';

class Navigation extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path={pathRoutes.AUTH} component={Auth} exact />
        <Route path={pathRoutes.ACCESS} component={Access} exact />
        <Route path={pathRoutes.BALLOT} component={Ballot} exact />
      </Router>
    );
  }
}

export { Navigation };