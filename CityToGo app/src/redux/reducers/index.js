import { combineReducers } from "redux"

import monument from './monumntReducer'
import currentLocation from './currentLocationReducer'
import imageRecognition from "./imageRecognitionReducer";
import getUserSession from "./getUserSessionReducer";

const reducers = combineReducers({
    monument,
    currentLocation,
    imageRecognition,
    getUserSession
})

export default reducers;