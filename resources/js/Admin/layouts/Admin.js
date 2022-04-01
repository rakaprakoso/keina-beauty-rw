import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";
import Home from "../pages/product/Home";
import Modify from "../pages/product/Modify";
import CampaignHome from "../pages/Campaign/Home";
import CampaignModify from "../pages/Campaign/Modify";
import Orders from "../pages/orders/Orders.js";
import OrdersModify from "../pages/orders/OrdersModify.js";

// // views

// import Dashboard from "views/admin/Dashboard.js";
// import Maps from "views/admin/Maps.js";
// import Settings from "views/admin/Settings.js";
// import Tables from "views/admin/Tables.js";
import { useDispatch, useSelector } from "react-redux";
import { LoadProfileAction } from "../../redux/actions/ProfileActions.js";
import Post from "../pages/post/Post.js";
import PostModify from "../pages/post/PostModify.js";

function Admin2(props) {
    return (
        <>
            <>
                <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
                    <AdminNavbar />

                    <HeaderStats />

                    <div className="px-4 md:px-10 mx-auto w-full -mt-24 flex flex-col z-10">
                        <Switch>
                            <Route
                                path="/admin/product/"
                                exact
                                component={Home}
                            />
                            <Route
                                path="/admin/product/:method/:id?"
                                exact
                                component={Modify}
                            />
                            <Route
                                path="/admin/orders/"
                                exact
                                component={Orders}
                            />
                            <Route
                                path="/admin/orders/:id?"
                                exact
                                component={OrdersModify}
                            />
                            <Route
                                path="/admin/campaign/"
                                exact
                                component={CampaignHome}
                            />
                            <Route
                                path="/admin/campaign/:method/:id?"
                                exact
                                component={CampaignModify}
                            />
                            {/* <Route path="/admin/dashboard" exact component={Dashboard} />
                                    <Route path="/admin/maps" exact component={Maps} />
                                    <Route path="/admin/settings" exact component={Settings} />
                                    <Route path="/admin/tables" exact component={Tables} />
                                    <Redirect from="/admin" to="/admin/dashboard" /> */}
                        </Switch>
                    </div>
                    <FooterAdmin />
                </div>
            </>
        </>
    );
}

export default function Admin(props) {
    const dispatch = useDispatch();
    const profileResponse = useSelector(
        (state) => state.userDetails.userProfile
    );
    // useEffect(() => {
    //     dispatch(LoadProfileAction());
    //     return () => {};
    // }, []);

    return (
        <>
            {
                profileResponse !== "" &&
                profileResponse !== null &&
                profileResponse.success === true ? (
                    <>
                        <Sidebar />
                        <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
                            <AdminNavbar />

                            <HeaderStats />

                            <div className="px-4 md:px-10 mx-auto w-full -mt-24 flex flex-col z-10">
                                <Switch>
                                    <Route
                                        path="/admin/product/"
                                        exact
                                        component={Home}
                                    />
                                    <Route
                                        path="/admin/product/:method/:id?"
                                        exact
                                        component={Modify}
                                    />
                                    <Route
                                        path="/admin/orders/"
                                        exact
                                        component={Orders}
                                    />
                                    <Route
                                        path="/admin/orders/:id?"
                                        exact
                                        component={OrdersModify}
                                    />
                                    <Route
<<<<<<< HEAD
=======
                                        path="/admin/post/"
                                        exact
                                        component={Post}
                                    />
                                    <Route
                                        path="/admin/post/:method/:id?"
                                        exact
                                        component={PostModify}
                                    />
                                    <Route
>>>>>>> post
                                        path="/admin/campaign/"
                                        exact
                                        component={CampaignHome}
                                    />
                                    <Route
                                        path="/admin/campaign/:method/:id?"
                                        exact
                                        component={CampaignModify}
                                    />
                                    {/* <Route path="/admin/dashboard" exact component={Dashboard} />
                                    <Route path="/admin/maps" exact component={Maps} />
                                    <Route path="/admin/settings" exact component={Settings} />
                                    <Route path="/admin/tables" exact component={Tables} />
                                    <Redirect from="/admin" to="/admin/dashboard" /> */}
                                </Switch>
                            </div>
                            <FooterAdmin />
                        </div>
                    </>
                ) : profileResponse == "loading..." ? (
                    <>Loading Data</>
                ) : (
                    profileResponse.success === false && (
                        <div> Unable to display profile</div>
                    )
                )
                // <Switch>
                //     <Route exact path={props.match.path} render={props => (
                //         <Redirect to={'/admin/auth/login'} />
                //     )} />
                // </Switch>
            }
        </>
    );
}
