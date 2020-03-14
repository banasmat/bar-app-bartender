import {
    ORDER_DATA_LOADED,
    ORDER_STATUS_UPDATED,
    ORDER_STATUS_CHECKED,
    API_ERROR
} from "../constants/action-types";
import {GET_ORDERS, ORDER_STATUS} from "../constants/urls";
import {PLACE_ID} from "../constants/config";

export function getOrderData() {
    return function(dispatch) {
        return fetch(GET_ORDERS.replace('{placeId}', PLACE_ID))
            .then(response => response.json())
            .then(json => {
                dispatch({ type: ORDER_DATA_LOADED, payload: json });
            });
    };
}

export function updateOrderStatus(orderId, status) {

    return function(dispatch) {
        return fetch(ORDER_STATUS.replace('{orderId}', orderId), {
            method: "POST",
            body: JSON.stringify({
                'status': status,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                if(json.ack === "SUCCESS"){
                    dispatch({ type: ORDER_STATUS_UPDATED, payload: {
                        orderId: orderId,
                        status: parseInt(status)
                    } });
                } else {
                    dispatch({ type: API_ERROR, payload: json });
                }
            });
    };
}

export function checkOrderStatus(orderId) {
    return function(dispatch) {
        return fetch(ORDER_STATUS.replace('{orderId}', orderId))
            .then(response => response.json())
            .then(json => {
                dispatch({ type: ORDER_STATUS_CHECKED, payload: json });
            });
    };
}