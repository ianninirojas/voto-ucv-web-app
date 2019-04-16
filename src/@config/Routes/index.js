import React from 'react';

import { Route, Switch } from 'react-router-dom';

// import {
//   ElectoralEvents,
//   ElectoralEvent,
// } from "../../@pages";


// import { pathRoutes } from "../../@constans";


const routes = [
  // {
  //   path: pathRoutes.ELECTORALEVENTS,
  //   component: ElectoralEvents,
  // },
  // {
  //   path: pathRoutes.ELECTORALEVENTDETAIL,
  //   component: ElectoralEvent,
  // }
]

const Routing = () => {
  return routes.map((route, index) => <Route key={index} exact={route.exact} path={route.path} component={route.component} />)
}

export const Routes = () => {
  return (
    <Switch>
      <Routing />
    </Switch>
  )
}