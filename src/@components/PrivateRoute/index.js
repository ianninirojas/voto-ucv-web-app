import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { voterService } from '../../@services';
import { pathRoutes } from '../../@constans';

export const PrivateRoute = ({ component: Component, codeType, ...rest }) => (
    <Route {...rest} render={props => {
        const currentVoter = voterService.currentVoterValue;
        if (currentVoter) {
            if (voterService.getTypeCode() === codeType) {
                return <Component {...props} />
            }
        }
        return <Redirect to={{ pathname: pathRoutes.ELECTORALEVENTS, state: { from: props.location } }} />
    }} />
)