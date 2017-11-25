/**
 * Created by zy on 2017/11/25.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux'
import createStore from '../../utils/createStore';


import reducer from '../../reducer/trade/index';
import initialState from '../../store/trade/index';
import App from '../../containers/trade/index';



// 多个使用 combineReducers
const store = createStore(reducer, initialState);


ReactDom.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('app')
);