import user from '../../Models/user';
import { LoadProfile } from '../../services/ProfileService';
import * as ActionTypes from '../ActionTypes';
export const LoadProfileAction = () => {
    return (dispatch) => {
        // dispatch({ type: ActionTypes.LOADING });

        LoadProfile().then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                console.log('Kondisi 1')
                localStorage.setItem("profile_data", JSON.stringify(res));
                // console.log(JSON.parse(localStorage.getItem("profile_data")))
                dispatch({ type: ActionTypes.LOAD_PROFILE_SUCCESS, res });
            } else if (res.hasOwnProperty('success') && res.success === false) {
                console.log('Kondisi 2')
                dispatch({ type: ActionTypes.LOAD_PROFILE_ERROR, res });
            }else{
                console.log('Kondisi 3')

                localStorage.removeItem("profile_data");
                user.logout();
                dispatch({ type: ActionTypes.LOGOUT_SUCCESS, res });
                dispatch({ type: ActionTypes.CLEAR_PROFILE, res });

                dispatch({ type: ActionTypes.LOAD_PROFILE_ERROR, res });
            }
        }).catch( (error) => {
            console.log('IF ERROR')
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}
