import { FETCHING_IMAGE_RECOGNITION, _FULFILLED, _REJECTED, _PENDING } from "../actions/types";

const initialState = {
    fetching: false,
    fetched: false,
    data: '',
    error: null
}

const getImageRecognition = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_IMAGE_RECOGNITION + _PENDING: {
            state = {
                ...state,
                fetching: true,
                fetched: false,
            }
            break;
        }
        case FETCHING_IMAGE_RECOGNITION + _FULFILLED: {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload.data
            }
            break;
        }
        case FETCHING_IMAGE_RECOGNITION + _REJECTED: {
            state = {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
        }
    }
    return state;
}

export default getImageRecognition;