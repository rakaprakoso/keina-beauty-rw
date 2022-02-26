import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
// import user from "../../Models/user";
// import { LoadProfileAction } from "../../redux/actions/ProfileActions";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    // const [isLoggedIn,setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(true);

    // const dispatch = useDispatch();
    const profileResponse = useSelector(
        (state) => state.userDetails.userProfile
    );
    // useEffect(() => {
    //     dispatch(LoadProfileAction());
    //     setLoading(false)
    //     return () => {
    //     };
    // }, [])

    // useEffect(async () => {
    //     const authCondition = await user.checkToken()
    //     if (authCondition) {
    //         setIsLoggedIn(true);
    //     }else{
    //         setIsLoggedIn(false);
    //     }
    //     setLoading(false)
    // })
    return (
        <Route
            {...rest}
            render={(props) => {
                // return JSON.stringify(profileResponse)
                // return <p>HALO</p>
                if(localStorage.getItem("profile_data")){
                    if (profileResponse && profileResponse.success) {
                        // return "TEST"
                        return <Component {...props} {...rest} />;
                    } else if (profileResponse == "loading...") {
                        return <p>{profileResponse}</p>;
                    }else{
                        <Switch>
                            <Redirect to={"/admin/login"}/>
                        </Switch>
                    }
                }

                return (
                    <Switch>
                        <Redirect to={"/admin/login"}/>
                    </Switch>
                );
            }}
        />
    );
};
