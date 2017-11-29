/**
 * Created by zy on 2017/11/25.
 */
import net from './netServer'

const ACTION_NAME = {
    GET_BASE_INFO_REQUEST: Symbol('GET_BASE_INFO_REQUEST'),
    GET_BASE_INFO_SUCCESS: Symbol('GET_BASE_INFO_SUCCESS'),
    GET_BASE_INFO_FAIL: Symbol('GET_BASE_INFO_FAIL'),
}

function getBaseInfoRequest(payload) {
    return {
        type: ACTION_NAME.GET_BASE_INFO_REQUEST,
        payload: payload,
    }
}

function getBaseInfoSuccess(payload) {
    return {
        type: ACTION_NAME.GET_BASE_INFO_SUCCESS,
        payload: payload,
    }
}

function getBaseInfoFail(payload) {
    return {
        type: ACTION_NAME.GET_BASE_INFO_FAIL,
        payload: payload,
    }
}

function getBaseInfo() {
    return (dispatch, getState) => {
        dispatch(getBaseInfoRequest());
        net.getBaseInfo().then((data) => {
            dispatch(getBaseInfoSuccess(data));
        }).catch((e) => {
            dispatch(getBaseInfoFail());
        })
    }
}



const ACTION_FUNCS = {
    getBaseInfo
}

export{
    ACTION_NAME,
    ACTION_FUNCS
}
