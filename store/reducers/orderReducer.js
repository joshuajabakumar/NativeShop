/*
    - Using this reducer to manage all Cart/Order related information
    - For Cart and Checkout
*/

import { INIT_CHECKOUT } from '../../constants/ActionTypes';

const initialState = {
    checkout: { lineItems: [] }
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_CHECKOUT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default orderReducer;