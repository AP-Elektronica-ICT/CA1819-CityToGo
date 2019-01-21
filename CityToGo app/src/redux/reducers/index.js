import { combineReducers } from "redux"

import monument from './monumntReducer'
import currentLocation from './currentLocationReducer'
import imageRecognition from "./imageRecognitionReducer";
import getUserSession from "./getUserSessionReducer";
import postUserSession from "./postUserSessionReducer";
import putUserSession from './putUserSubSessionReducer'
import quiz from './quizReducer'

const reducers = combineReducers({
    monument,
    currentLocation,
    imageRecognition,
    getUserSession,
    postUserSession,
    putUserSession,
    quiz
})

export default reducers;