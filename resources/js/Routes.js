import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from "./components/pages/HomeComponent";
import Login from "./components/pages/LoginComponent";
import Register from "./components/pages/RegisterComponent";
import PrivateRoute from './PrivateRoute';
import { Guard } from './Guard';
import Header from './components/layouts/Header';
import Auth from './Admin/layouts/Auth';
import Admin from './Admin/layouts/Admin';

// import Login from "./Admin/views/auth/Login";


function Routes() {
    return (
        <>
            {/* <Header /> */}
            <Switch>
                {/* <Route exact path="/admin" render={props => (
                    <Redirect to={{ pathname: '/admin/dashboard' }} />
                )} /> */}
                <Route path="/admin/auth" component={Auth} />
                <Route path="/admin/home" component={Home} />
                <Route path="/admin/login" component={Login} />
                <Route path="/admin/register" component={Register} />
                {/*Redirect if not authenticated */}
                <Guard path="/admin/user/profile-view" token="user-token" routeRedirect="/admin/login" component={PrivateRoute} />
                {/* <Guard path="/admin/user" token="user-token" routeRedirect="/admin/login" component={PrivateRoute} /> */}
                <Guard path="/admin" token="user-token" routeRedirect="/admin/auth/login"
                    component={PrivateRoute}
                />
            </Switch>
        </>
    );
}
export default Routes;
