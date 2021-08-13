import { combineReducers } from "redux";
import ActionType from './globalActionType'
import { GET_CART, ADD_CART } from "../actions/globalAction";

const globalState = {
    totalCart: 0,
    cartData: [],
}

// const rootReducer = combineReducers({
//     spots: spotReducer
//   });

// Reducer
const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        // case ActionType.ADD_CART:
        //     return {
        //         ...state,
        //         totalCart: state.totalCart + 1
        //     };
        case ADD_CART:
            return {
                ...state,
                cartData: action.cartData
            };
        case GET_CART:
            return { ...state, cartData: action.cartData };
        default:
            return state;
    }
    return state;
    // if (action.type === ActionType.ADD_CART) {
    //     return {
    //         ...state,
    //         totalCart: state.totalCart + 1
    //     }
    // }
    // return state
}

export default rootReducer
