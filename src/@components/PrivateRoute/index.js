import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService, voterService } from '../../@services';
import { pathRoutes } from '../../@constans';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentVoter = voterService.currentVoterValue;
        if (!currentVoter) {
            return <Redirect to={{ pathname: pathRoutes.ELECTORALEVENTS, state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)