/**
 * Created by zy on 2017/11/25.
 */
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
const loggerMiddleware = createLogger()

let createStoreWithMiddleware = null;
if (__DEV__) {
    createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )(createStore);
} else {
    createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware
    )(createStore);
}


export default createStoreWithMiddleware;

