import React, { Component } from 'react';

import { Router, Route } from 'react-router-dom';

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

class Navigation extends Component {
  render() {
    return (
      <div className='all-height'>
        <Router history={history}>
          <Route path={pathRoutes.ELECTORALEVENTS} component={ElectoralEvents} exact />
          <Route path={pathRoutes.AUTH} component={Auth} exact />
          <Route path={pathRoutes.ACCESS} component={Access} exact />
          <Route path={pathRoutes.BALLOT} component={Ballot} exact />
          <Route path={pathRoutes.RESULT} component={Result} exact />
          <Route path={pathRoutes.TIMEOUT} component={Timeout} exact />
          <Route path={pathRoutes.VOTESUCCESS} component={VoteSuccess} exact />
        </Router>
        {/* <Footer /> */}
      </div>
    );
  }
}

export { Navigation };