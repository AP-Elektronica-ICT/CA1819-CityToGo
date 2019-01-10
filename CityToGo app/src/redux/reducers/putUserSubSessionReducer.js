import {
    FETCHING_PUT_USER_SUBSESSION,
    _FULFILLED,
    _REJECTED,
    _PENDING
} from "../actions/types";


const initialState = {
    fetching: false,
    fetched: false,
    response: {},
    error: null
}

const putUserSession = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_PUT_USER_SUBSESSION + _PENDING:
            state = {
                ...state,
                fetching: true
            }
            break;
        case FETCHING_PUT_USER_SUBSESSION + _FULFILLED:
            state = {
                ...state,
                fetching: false,
                fetched: true,
                response: action.payload
            }
            break;

        case FETCHING_PUT_USER_SUBSESSION + _REJECTED:
            state = {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
    }
    return state;
}

export default putUserSession;