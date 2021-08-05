import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// const BrowserRouter = require("react-router-dom").BrowserRouter;
import Main from './Router';
// class Index extends Component {
export const Index = () => {

    return (

        <>
            <BrowserRouter>
                <Route component={Main} />
            </BrowserRouter>
        </>
    );

}

// export default Index;
if (document.getElementById('root')) {
    // ReactDOM.render(<Header />, document.getElementById('header'));
    ReactDOM.render(<Index />, document.getElementById('root'));
}
