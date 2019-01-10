import { FETCHING_MONUMENTS, _FULFILLED, _REJECTED, _PENDING } from "../actions/types";

const initialState = {
    fetching: false,
    fetched: false,
    monument: {},
    error: null
}

const monument = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_MONUMENTS + _PENDING:
            state = {
                ...state,
                fetching: true
            }
            break;

        case FETCHING_MONUMENTS + _FULFILLED:
            state = {
                ...state,
                fetching: false,
                fetched: true,
                monument: action.payload
            }
            break;

        case FETCHING_MONUMENTS + _REJECTED:
            state = {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;

            
    }
    return state;
}

export default monument;