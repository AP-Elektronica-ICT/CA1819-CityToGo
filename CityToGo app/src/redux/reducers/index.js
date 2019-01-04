import { combineReducers } from "redux"

import monument from './monumntReducer'
import currentLocation from './currentLocationReducer'
import imageRecognition from "./imageRecognitionReducer";
import userSession from "./userSessionReducer";

const reducers = combineReducers({
    monument,
    currentLocation,
    imageRecognition,
    userSession
})

export default reducers;