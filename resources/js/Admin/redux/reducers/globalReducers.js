import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from "./ProfileReducer";
const RootAdminReducer = combineReducers({
userAuth: AuthReducer,
userDetails: ProfileReducer,
});
export default RootAdminReducer;
