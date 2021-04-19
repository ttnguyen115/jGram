import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router';

IsUserLoggedIn.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired,
    loggedInPath: PropTypes.string.isRequired,
};

function IsUserLoggedIn({ user, loggedInPath, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!user) {
                    return children;
                }

                if (user) {
                    return (
                        <Redirect
                            to={{
                                pathname: loggedInPath,
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

export default IsUserLoggedIn;