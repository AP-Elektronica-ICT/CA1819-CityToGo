import { GET_CURRENT_LOCATION_PENDING, GET_CURRENT_LOCATION_FULFILLED, GET_CURRENT_LOCATION_REJECTED } from "../actions/types";

initialState = {
    fetching: false,
    fetched: false,
    coords: {},
    error: null,
};

const currentLocation = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_LOCATION_PENDING:
            state = {
                ...state,
                fetching: true
            }

            break;
        case GET_CURRENT_LOCATION_FULFILLED:
            state = {
                ...state,
                coords: action.payload,
                fetching: false,
                fetched: true,
            }
            

        

            break;
        case GET_CURRENT_LOCATION_REJECTED:
            state = {
                ...state,
                fetching: false,
                error: action.payload

            }

            break;

        default:
            break;
    }
    return state;
}

export default currentLocation;
