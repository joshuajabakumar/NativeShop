import { UPDATE_APP } from '../../constants/ActionTypes';

const initialState = {
    appVersion: 0.1
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_APP:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default appReducer;