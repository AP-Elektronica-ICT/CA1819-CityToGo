import {
    FETCHING_POLY,
    _FULFILLED,
    _REJECTED,
    _PENDING,
} from "../actions/types";

const initialState = {
    fetching: false,
    fetched: false,
    poly: [],
    error: null
}

const poly = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_POLY + _PENDING:
            state = {
                ...state,
                fetched: false,
                fetching: true
            }
            break;

        case FETCHING_POLY + _FULFILLED:
            state = {
                ...state,
                fetching: false,
                fetched: true,
                poly: action.payload
            }
            break;

        case FETCHING_POLY + _REJECTED:
            state = {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;



    }
    return state;
}

export default poly;