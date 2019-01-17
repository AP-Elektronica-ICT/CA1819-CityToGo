import { GET_CURRENT_LOCATION_PENDING, GET_CURRENT_LOCATION_FULFILLED, GET_CURRENT_LOCATION_REJECTED } from "./types";


export const getLocationRequest = () => ({
    type: GET_CURRENT_LOCATION_PENDING
})

export const getLocationSucces = (coords) => ({
    type: GET_CURRENT_LOCATION_FULFILLED,
    payload: coords
})

export const getLocationFailure = (error) => ({
    type: GET_CURRENT_LOCATION_REJECTED,
    payload: error
})

export const location = () => {
 

    return async dispatch => {
        dispatch(getLocationRequest());

        navigator.geolocation.watchPosition(position => {
            let coords = position.coords
            dispatch(getLocationSucces(coords))
        },
            (error) => dispatch(getLocationFailure(error)),
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 0, distanceFilter: 5 }
        );

    }

}