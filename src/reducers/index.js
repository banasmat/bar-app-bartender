import {
    ORDER_DATA_LOADED, ORDER_STATUS_UPDATED
} from "../constants/action-types";
import update from 'immutability-helper';

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
    // if (action.type === ORDER_STATUS_UPDATED) {
    //
    //     const orderId = action.payload.orderId;
    //
    //     //TODO if new status 5, remove from the list
    //
    //     return update(state, {
    //         orders: orders =>
    //             update(orders || {}, {
    //                 [orderId]: order =>
    //                     update(order, {
    //                         status: {$set: action.payload.status}
    //                     })
    //             })
    //     });
    // }
    return state;
}

export default rootReducer;