import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import HomePage from './page/HomePage';

PostFeature.propTypes = {};

function PostFeature(props) {
    const match = useRouteMatch();

    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={HomePage} />
            </Switch>
        </Box>
    );
}

export default PostFeature;