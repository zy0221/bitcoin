/**
 * Created by zy on 2017/11/25.
 */

import net from './netServer'
import ROUTER from '../../constants/router'

const ACTION_NAME = {
    LOGIN_REQUEST: Symbol('LOGIN_REQUEST'),
    LOGIN_FAIL: Symbol('LOGIN_FAIL')
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

function login(arg) {
    return (dispatch, getState) => {
        dispatch(loginRequest());
        return net.login(arg).then((data) => {
            window.location.href = ROUTER.INDEX;
        }).catch((e) => {
            dispatch(loginFail(e.message));
            throw e;
        })
    }
}


const ACTION_FUNCS = {
    login
}

export{
    ACTION_NAME,
    ACTION_FUNCS
}
