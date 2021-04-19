import React from 'react';
import PropTypes from 'prop-types';
import * as ROUTES from '../constants/routes';
import { Redirect, Route } from 'react-router';

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired,
};

function ProtectedRoute({ user, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (user) {
                    return children;
                }

                if (!user) {
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state: { from: location }
                            }}
                        />
                    );
                }

                return null;
            }}
        />
    );
}

export default ProtectedRoute;