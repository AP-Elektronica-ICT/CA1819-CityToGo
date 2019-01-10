import { FETCHING_GET_USER_SESSION, _FULFILLED, _REJECTED, _PENDING } from "../actions/types";


const initialState = {
    fetching: false,
    fetched: false,
    response: {},
    error: null
}

const getUserSession = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_GET_USER_SESSION + _PENDING:
            state = {
                ...state,
                fetching: true
            }
            break;
        case FETCHING_GET_USER_SESSION + _FULFILLED:
            state = {
                ...state,
                fetching: false,
                fetched: true,
                response: action.payload
            }
            break;

        case FETCHING_GET_USER_SESSION + _REJECTED:
            state = {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
    }
    return state;
}

export default getUserSession;



