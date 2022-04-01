import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { LoginAction } from "../../redux/actions/AuthActions";

export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    //const authResponse = useSelector(state=>state.userAuth.authResponse);
    const [fields, setState] = useState({
        email: "",
        password: "",
    });
    const handleFieldChange = (e) => {
        setState({
            ...fields,
            [e.target.id]: e.target.value,
        });
    };
    const UserLogin = (e) => {
        e.preventDefault();
        console.log(fields);
        dispatch(LoginAction(fields, history));
    };

    const handleSubmit = (values) => {
        // event.preventDefault();
        const formData = new FormData();

        const loginCredentials = {
            email: values.email,
            password: values.password,
        };

        dispatch(LoginAction(loginCredentials, history));

        // const authenticatedCallback = () => {
        //   let { from } = location.state || { from: { pathname: "/dashboard" } };
        //   history.replace(from);
        // };
        // axios
        //   .post("http://localhost:8000/api/login", loginCredentials)
        //   .then((response) => {
        //     user.authenticated(response.data, authenticatedCallback);
        //   });
    };

    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-sm font-bold">
                                        Sign in with
                                    </h6>
                                </div>
                                <div className="btn-wrapper text-center">
                                    <button
                                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <img
                                            alt="..."
                                            className="w-5 mr-1"
                                            src={
                                                require("../../assets/img/github.svg")
                                                    .default
                                            }
                                        />
                                        Github
                                    </button>
                                    <button
                                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <img
                                            alt="..."
                                            className="w-5 mr-1"
                                            src={
                                                require("../../assets/img/google.svg")
                                                    .default
                                            }
                                        />
                                        Google
                                    </button>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <small>Or sign in with credentials</small>
                                </div>
                                <Formik
                                    initialValues={{
                                        email: "",
                                        password: "",
                                    }}
                                    onSubmit={async (values) => {
                                        handleSubmit(values);
                                    }}
                                >
                                    <Form>
                                        <div className="relative w-full mb-3">
                                            <label
                                                htmlFor="email"
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Email
                                            </label>
                                            <Field
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                id="email"
                                                name="email"
                                                placeholder="jane@acme.com"
                                                type="email"
                                            />
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label
                                                htmlFor="password"
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Password
                                            </label>
                                            <Field
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    id="customCheckLogin"
                                                    type="checkbox"
                                                    className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                                />
                                                <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                                    Remember me
                                                </span>
                                            </label>
                                        </div>

                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Sign In
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-blueGray-200"
                                >
                                    <small>Forgot password?</small>
                                </a>
                            </div>
                            <div className="w-1/2 text-right">
                                <Link
                                    to="/auth/register"
                                    className="text-blueGray-200"
                                >
                                    <small>Create new account</small>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
