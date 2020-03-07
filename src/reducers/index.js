import {
    ORDER_DATA_LOADED
} from "../constants/action-types";

const initialState = {
    orders: [],
};


function rootReducer(state = initialState, action) {
    if (action.type === ORDER_DATA_LOADED) {
        return {
            ...state,
            orders: state.orders = action.payload
        }
    }
    return state;
}

export default rootReducer;