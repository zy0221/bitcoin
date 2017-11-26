/**
 * Created by zy on 2017/11/25.
 */

import net from './netServer'
import NET_STATUS from '../../constants/netStatus';
import PormiseUtils from '../../utils/promiseUtils';
const ACTION_NAME = {
    LOGIN_REQUEST: Symbol('LOGIN_REQUEST'),
    LOGIN_FAIL: Symbol('LOGIN_FAIL'),
    LOGIN_SUCCESS: Symbol('LOGIN_SUCCESS'),
    REGISTER_REQUEST: Symbol('REGISTER_REQUEST'),
    REGISTER_FAIL: Symbol('REGISTER_FAIL'),
    REGISTER_SUCCESS: Symbol('REGISTER_SUCCESS')
}


function loginRequest(payload) {
    return {
        type: ACTION_NAME.LOGIN_REQUEST,
        payload: payload,
    }
}

function loginFail(payload) {
    return {
        type: ACTION_NAME.LOGIN_FAIL,
        payload: payload,
    }
}

function loginSuccess(payload) {
    return {
        type: ACTION_NAME.LOGIN_SUCCESS,
        payload: payload,
    }
}

function login(arg) {
    return (dispatch, getState) => {
        if(getState().app.loginStatus === NET_STATUS.DOING){
            return PormiseUtils.getEmptyReject(null);
        }
        dispatch(loginRequest());
        return net.login(arg).then((data) => {
            dispatch(loginSuccess(data));
        }).catch((e) => {
            dispatch(loginFail(e.message));
            throw e;
        })
    }
}


function registerRequest(payload) {
    return {
        type: ACTION_NAME.REGISTER_REQUEST,
        payload: payload,
    }
}

function registerFail(payload) {
    return {
        type: ACTION_NAME.REGISTER_FAIL,
        payload: payload,
    }
}

function registerSuccess(payload) {
    return {
        type: ACTION_NAME.REGISTER_SUCCESS,
        payload: payload,
    }
}


function register(arg) {
    return (dispatch, getState) => {
        if(getState().app.registerStatus === NET_STATUS.DOING){
            return PormiseUtils.getEmptyReject(null);
        }
        dispatch(registerRequest());
        return net.register(arg).then((data) => {
            dispatch(registerSuccess(data));
        }).catch((e) => {
            dispatch(registerFail(e.message));
            throw e;
        })
    }
}


const ACTION_FUNCS = {
    login,
    register
}

export{
    ACTION_NAME,
    ACTION_FUNCS
}
