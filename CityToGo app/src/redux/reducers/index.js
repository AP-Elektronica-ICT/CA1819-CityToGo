import { combineReducers } from "redux"

import monument from './monumntReducer'
import currentLocation from './currentLocationReducer'
import imageRecognition from "./imageRecognitionReducer";
import getUserSession from "./getUserSessionReducer";
import postUserSession from "./postUserSessionReducer";

const reducers = combineReducers({
    monument,
    currentLocation,
    imageRecognition,
    getUserSession,
    postUserSession
})

export default reducers;