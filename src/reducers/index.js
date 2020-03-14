import {
    ORDER_DATA_LOADED, ORDER_STATUS_UPDATED
} from "../constants/action-types";

const initialState = {
    orders: {},
};


function rootReducer(state = initialState, action) {
    if (action.type === ORDER_DATA_LOADED) {
        return {
            ...state,
            orders: state.orders = action.payload
        }
    }
    if (action.type === ORDER_STATUS_UPDATED) {

        const orderId = action.payload.orderId;

        let order = state.orders[orderId];
        order.status = action.payload.status;


        return {
            ...state,
            orders: {
                ...state.orders,
                [orderId]: order
            }
        };
    }
    return state;
}

export default rootReducer;