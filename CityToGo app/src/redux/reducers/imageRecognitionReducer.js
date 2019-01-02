const initialState = {
    fetching: false,
    fetched: false,
    data: '',
    error: null
}

const getImageRecognition = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCHING_IMAGE_RECOGNITION_PENDING': {
            state = {
                ...state,
                fetching: true
            }
            break;
        }
        case 'FETCHING_IMAGE_RECOGNITION_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload.data
            }
            break;
        }
        case 'FETCHING_IMAGE_RECOGNITIONFETCHING_IMAGE_RECOGNITIONFETCHING_IMAGE_RECOGNITION_REJECTED': {
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