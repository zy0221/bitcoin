/**
 * Created by zy on 2017/11/25.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux'
import { combineReducers } from 'redux'
import createStore from '../../utils/createStore';

import { baseStart, baseReducer, baseStore } from '../../base/index';

import reducer from '../../reducer/user/index';
import initialState from '../../store/user/index';
import App from '../../containers/user/index';



// 多个使用 combineReducers
const store = createStore(combineReducers({
    base: baseReducer,
    app: reducer,
}), {
    base: baseStore,
    app: initialState
});
baseStart(store);

ReactDom.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('app')
);