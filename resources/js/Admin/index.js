import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
// const BrowserRouter = require("react-router-dom").BrowserRouter;
import Main from "./Router";
import rootAdminReducer from "./redux/reducers/globalReducers";
// class Index extends Component {

//Store
const storeRedux = createStore(rootAdminReducer, applyMiddleware(ReduxThunk));

export const Index = () => {
    return (
        <>
            <Provider store={storeRedux}>
                <BrowserRouter>
                    <Route component={Main} />
                </BrowserRouter>
            </Provider>
        </>
    );
};

// export default Index;
if (document.getElementById("root")) {
    // ReactDOM.render(<Header />, document.getElementById('header'));
    ReactDOM.render(<Index />, document.getElementById("root"));
}
