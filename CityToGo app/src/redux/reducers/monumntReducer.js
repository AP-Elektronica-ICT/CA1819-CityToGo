const initialState = {
    fetching: false,
    fetched: false,
    data: [],
    error: null
}

const monument = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCHING_MONUMENTS_PENDING': {
            state = {
                ...state,
                fetching: true
            }
            break;
        }
        case 'FETCHING_MONUMENTS_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            }
            break;
        }
        case 'FETCHING_MONUMENTS_REJECTED': {
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

export default monument;