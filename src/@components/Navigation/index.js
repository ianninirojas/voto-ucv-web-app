import React, { Component } from 'react';

import { Router, Route, Redirect, Switch } from 'react-router-dom';

import { history } from "../../@helpers";

import {
  Login,
  Auth,
  Result,
  Access,
  Ballot,
  Timeout,
  ElectoralEvents,
  VoteSuccess,
  Electors
} from '../../@pages';

import {
  Footer,
  CheckToken,
  PrivateRoute,
} from "../../@components";

import { voterService } from '../../@services';

import { pathRoutes } from '../../@constans';
import { DefaultLayout } from '../../@layouts/DefaultLayout';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.onbeforeunload = function () {
      voterService.removeCurrentVoter();
    };
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path={pathRoutes.ELECTORALEVENTS} component={DefaultLayout(ElectoralEvents)} exact />
          <Route path={pathRoutes.ELECTORS} component={Electors} exact />
          <Route path={pathRoutes.CHECKTOKEN} component={CheckToken} exact />
          <PrivateRoute path={pathRoutes.AUTH} codeType='auth' component={DefaultLayout(Auth)} exact />
          <PrivateRoute path={pathRoutes.ACCESS} codeType='access' component={DefaultLayout(Access)} exact />
          <PrivateRoute path={pathRoutes.LOGIN} codeType='login' component={DefaultLayout(Login)} exact />
          <PrivateRoute path={pathRoutes.BALLOT} codeType='vote' component={Ballot} exact />
          <PrivateRoute path={pathRoutes.VOTESUCCESS} codeType='vote' component={DefaultLayout(VoteSuccess)} exact />
          <Route path={pathRoutes.RESULT} component={Result} exact />
          <PrivateRoute path={pathRoutes.TIMEOUT} codeType='vote' component={DefaultLayout(Timeout)} exact />
          <Redirect to={pathRoutes.ELECTORALEVENTS} component={ElectoralEvents} exact />
        </Switch>
      </Router>
    );
  }
}

export { Navigation };