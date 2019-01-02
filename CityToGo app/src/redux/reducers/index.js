import { combineReducers } from "redux"

import monument from './monumntReducer'
import currentLocation from './currentLocationReducer'
import imageRecognition from "./imageRecognitionReducer";

const reducers = combineReducers({
    monument,
    currentLocation,
    imageRecognition
})

export default reducers;