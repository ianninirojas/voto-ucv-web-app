import React, { Component } from 'react';

import { Router, Route, Switch } from 'react-router-dom';

import { history } from "../../@helpers";

import { pathRoutes } from "../../@constans";

import {
  Home
} from "../../@pages";

const routes = [
  {
    path: pathRoutes.HOME,
    component: Home,
    exact: true
  }
]

class Routes extends Component {

  Routing = () => {
    return routes.map((route, index) => <Route key={index} exact={route.exact} path={route.path} component={route.component} />)
  }

  render() {
    const { Routing } = this

    return (
      <Router history={history}>
        <Switch>
          <Routing />
        </Switch>
      </Router>
    );
  }
}

export { Routes };