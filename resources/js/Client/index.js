import React, { Component, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Main from "./Router";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./redux/reducer/globalReducer";
import { CookiesProvider } from "react-cookie";

import "./i18n";

//Store
const storeRedux = createStore(rootReducer, applyMiddleware(ReduxThunk));

// class Index extends Component {
export const Index = () => {
    return (
        <>
            <CookiesProvider>
                <Provider store={storeRedux}>
                    <Suspense fallback={null}>
                        <BrowserRouter>
                            <Route component={Main} />
                        </BrowserRouter>
                    </Suspense>
                </Provider>
            </CookiesProvider>
        </>
    );
};

// export default Index;
if (document.getElementById("root")) {
    // ReactDOM.render(<Header />, document.getElementById('header'));
    // ReactDOM.render(<Provider store={storeRedux}><Index /></Provider>, document.getElementById('root'));
    ReactDOM.render(<Index />, document.getElementById("root"));
}
