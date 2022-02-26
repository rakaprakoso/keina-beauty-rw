import * as ActionTypes from '../ActionTypes';
// import { AUTHENTICATED, NOT_AUTHENTICATED } from './actionTypes'
import { RegisterUserService, LoginUserService, LogOutUserService } from '../../services/AuthServices';
import { LoadProfileAction } from './ProfileActions';
import user from '../../Models/user';
export const RegisterAction = (credentials) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
        dispatch({ type: ActionTypes.LOADING });
        RegisterUserService(credentials).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: ActionTypes.SIGNUP_SUCCESS, res });
            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: ActionTypes.SIGNUP_ERROR, res });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}
export const LoginAction = (credentials, history) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
        dispatch({ type: ActionTypes.LOADING });
        LoginUserService(credentials).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                localStorage.setItem("profile_data", JSON.stringify(res));

                localStorage.setItem('user-token', res.token)

                // localStorage.setItem("userName", res.name);
                // localStorage.setItem("userEmail", res.email);
                // localStorage.setItem("accessToken", res.access_token);
                // localStorage.setItem("userLoggedIn", true);

                user.authenticated(res);

                dispatch({ type: ActionTypes.LOGIN_SUCCESS });
                dispatch(LoadProfileAction());
                history.push('/admin');
            } else if (res.hasOwnProperty('success') && res.success === false) {
                console.log("Gagal");
                dispatch({ type: ActionTypes.LOGIN_ERROR, res });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}
export const LogoutAction = (history) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
        LogOutUserService().then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                localStorage.removeItem("profile_data");
                user.logout();
                dispatch({ type: ActionTypes.LOGOUT_SUCCESS, res });
                dispatch({ type: ActionTypes.CLEAR_PROFILE, res });
                history.push('/login');
            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: ActionTypes.LOGOUT_SUCCESS, res });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}



const setToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

export const getToken = () => {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
    if (timeSinceLastLogin < timeAllowed) {
        return localStorage.getItem("token");
    }
};

const deleteToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("lastLoginTime");
}

export const signupUser = (credentials) => {
    return (dispatch) => {
        return fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: credentials })
        }).then((res) => {
            if (res.ok) {
                setToken(res.headers.get("Authorization"));
                return res
                    .json()
                    .then((userJson) =>
                        dispatch({ type: ActionTypes.AUTHENTICATED, payload: userJson })
                    );
            } else {
                return res.json().then((errors) => {
                    dispatch({ type: ActionTypes.NOT_AUTHENTICATED });
                    return Promise.reject(errors);
                });
            }
        });
    };
};

export const loginUser = (credentials) => {
    return (dispatch) => {
      return fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: credentials }),
      }).then((res) => {
        if (res.ok) {
          setToken(res.headers.get("Authorization"));
          return res
            .json()
            .then((userJson) =>
              dispatch({ type: ActionTypes.AUTHENTICATED, payload: userJson })
            );
        } else {
          return res.json().then((errors) => {
            dispatch({ type: ActionTypes.NOT_AUTHENTICATED });
            return Promise.reject(errors);
          });
        }
      });
   };
};

export const logoutUser = () => {
    return (dispatch) => {
        return fetch("http://localhost:8000/api/logout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: getToken(),
            },
        }).then((res) => {
            deleteToken()
            if (res.ok) {
                return res.json()
                .then(() => dispatch({ type: ActionTypes.NOT_AUTHENTICATED }))
            } else {
                return res.json().then((errors) => {
                    dispatch({ type: ActionTypes.NOT_AUTHENTICATED })
                    return Promise.reject(errors)
                })
            }
        })
    }
}

export const checkAuth = () => {
    return (dispatch) => {
      return fetch("http://localhost:8000/current_user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getToken()
        }
      }).then((res) => {
        if (res.ok) {
          return res
          .json()
          .then(user => {
          user.data ? dispatch({type: ActionTypes.AUTHENTICATED, payload: user}) : dispatch({type: ActionTypes.NOT_AUTHENTICATED})})
        } else {
          return Promise.reject(dispatch({type: ActionTypes.NOT_AUTHENTICATED}))
        }
     });
   };
};
