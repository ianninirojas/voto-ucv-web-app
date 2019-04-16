import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../../@services';
import { pathRoutes } from '../../@constans';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            return <Redirect to={{ pathname: pathRoutes.ACCESS, state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)