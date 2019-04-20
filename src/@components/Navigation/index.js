import React, { Component } from 'react';

import { Router, Route, Redirect, Switch } from 'react-router-dom';

import { history } from "../../@helpers";

import { pathRoutes } from '../../@constans';

import {
  Auth,
  Result,
  Access,
  Ballot,
  Timeout,
  ElectoralEvents,
  VoteSuccess,
} from '../../@pages';
import { Footer } from '../Footer';
import { voterService } from '../../@services';
import { PrivateRoute } from '../PrivateRoute';

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
      <div className='all-height'>
        <Router history={history}>
          <Switch>
            <Route path={pathRoutes.ELECTORALEVENTS} component={ElectoralEvents} exact />
            <Route path={pathRoutes.AUTH} component={Auth} exact />
            <Route path={pathRoutes.ACCESS} component={Access} exact />
            <Route path={pathRoutes.RESULT} component={Result} exact />
            <PrivateRoute path={pathRoutes.BALLOT} component={Ballot} exact />
            <PrivateRoute path={pathRoutes.VOTESUCCESS} component={VoteSuccess} exact />
            <PrivateRoute path={pathRoutes.TIMEOUT} component={Timeout} exact />
            <Redirect to={pathRoutes.ELECTORALEVENTS} component={ElectoralEvents} exact />
          </Switch>
        </Router>
        {/* <Footer /> */}
      </div>
    );
  }
}

export { Navigation };