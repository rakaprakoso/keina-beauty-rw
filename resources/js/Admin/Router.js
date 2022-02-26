import { React, useEffect } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

// import NotFound from './pages/NotFound';

// import Home from './pages/Admin/Home'
// import About from './pages/About'
// import Shop from './pages/Shop'
// import Contact from './pages/Contact'
// import Product from './pages/Ecommerce/Product';
// import {Cart,Checkout} from './pages/Ecommerce/Transactions.module'
import Dashboard from "./views/admin/Dashboard";
import Admin from "./layouts/Admin";
import AdminMain from "./layouts/AdminMain";
import Login from "./views/auth/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import Auth from "./layouts/Auth";
import { useDispatch, useSelector } from "react-redux";
import { LoadProfileAction } from "./redux/actions/ProfileActions";

const Main = (props) => {
    const dispatch = useDispatch();
    const profileResponse = useSelector(
        (state) => state.userDetails.userProfile
    );
    useEffect(() => {
        dispatch(LoadProfileAction());
        // setLoading(false)
        return () => {};
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <link
                    rel="shortcut icon"
                    href="\assets\green-white.png"
                    type="image/x-icon"
                />
            </Helmet>
            <Switch>
                <Auth exact path={"/admin/login"} component={Login} />
                <ProtectedRoute path={"/admin"} component={Admin} />
                <Route
                    exact
                    path="/admin"
                    render={(props) => <Redirect to={"/admin/product/"} />}
                />

                {/* <Route path="/admin" component={Admin}/> */}

                {/* <Route path="/admin/product" component={AdminMain}/>
                <Route path="/admin/dashboard" component={Home}/> */}
                {/* <Route path="/about" component={About} />
                <Route path="/shop" component={Shop} />
                <Route path="/product/:slug" component={Product}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/checkout" component={Checkout}/>

                <Route path="/contact" component={Contact}/> */}
                <Route component={NotFound} />
            </Switch>
        </>
    );
};
export default Main;

const NotFound = () => {
    return <div>NotFound</div>;
};
const Home = () => {
    return <div>Home</div>;
};
