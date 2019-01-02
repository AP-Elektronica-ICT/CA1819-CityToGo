import { combineReducers } from "redux"

import monument from './monumntReducer'
import currentLocation from './currentLocationReducer'

const reducers = combineReducers({
    monument,
    currentLocation
})

export default reducers;