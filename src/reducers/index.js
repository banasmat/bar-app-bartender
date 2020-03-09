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
        console.log(orderId);
        console.log(state.orders);

        let order = state.orders[orderId];
        order.state = action.payload.state;
//FIXME correct updating state
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