import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './components/pages/ProfileComponent';
import Admin from './Admin/layouts/Admin';
export default function PrivateRoute(props) {
    return (
        <div>
            {/*<Header/>*/}
            <Switch>
                <Route exact path={`${props.match.path}/view-profile`} component={Profile} />
                {/* <Route exact path={props.match.path} render={props => (
                    <Redirect to={{ pathname: `${props.match.path}/view-profile` }} />
                )} /> */}
                <Route path={`${props.match.path}`} component={Admin} />
            </Switch>
        </div>
    );
}
