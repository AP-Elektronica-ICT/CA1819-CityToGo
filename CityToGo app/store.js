import { applyMiddleware, createStore, compose } from "redux"
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from './src/redux/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(promise(), thunk, logger)

export default createStore(
    reducers,
    composeEnhancers(
        middleware
    )
);