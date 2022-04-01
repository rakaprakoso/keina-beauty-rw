import * as ActionTypes from "../ActionTypes";
const initState = {
  authResponse: "",
  authChecked: false,
  loggedIn: false,
  currentUser: {},
};
const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.RESTART_AUTH_RESPONSE:
      return {
        ...state,
        authResponse: "",
      };
    case ActionTypes.LOADING:
      return {
        ...state,
        authResponse: "loading...",
      };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authResponse: "redirecting to dashboard...",
      };
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.LOGOUT_ERROR:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.CODE_ERROR:
      return {
        ...state,
        authResponse:
          "There seems to be a problem, please refresh your browser",
      };
    case ActionTypes.AUTHENTICATED:
      return {
        ...state,
        authChecked: true,
        loggedIn: true,
        currentUser: action.payload,
      };
    case ActionTypes.NOT_AUTHENTICATED:
      return {
        ...state,
        authChecked: true,
        loggedIn: false,
        currentUser: {},
      };
    default:
      return state;
  }
};
export default AuthReducer;
