import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import HomePage from './page/HomePage';

PostFeature.propTypes = {};

function PostFeature(props) {
    const match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={match.url} exact component={HomePage} />
            </Switch>
        </div>
    );
}

export default PostFeature;