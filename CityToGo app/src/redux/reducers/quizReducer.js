import {
    FETCHING_QUIZ,
    _FULFILLED,
    _REJECTED,
    _PENDING,
} from "../actions/types";

const initialState = {
    fetching: false,
    fetched: false,
    quiz: [],
    error: null
}

const quiz = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_QUIZ + _PENDING:
            state = {
                ...state,
                fetched: false,
                fetching: true
            }
            break;

        case FETCHING_QUIZ + _FULFILLED:
            state = {
                ...state,
                fetching: false,
                fetched: true,
                quiz: action.payload
            }
            break;

        case FETCHING_QUIZ + _REJECTED:
            state = {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;



    }
    return state;
}

export default quiz;