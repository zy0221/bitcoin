/**
 * Created by zy on 2017/11/25.
 */
import net from './netServer'

const ACTION_NAME = {
    GET_BASE_INFO_SUCCESS: Symbol('GET_BASE_INFO_SUCCESS'),
}

function getBaseInfoSuccess(payload) {
    return {
        type: ACTION_NAME.GET_BASE_INFO_SUCCESS,
        payload: payload,
    }
}

function getBaseInfo() {
    return (dispatch, getState) => {
        console.log(getState());
        net.getBaseInfo().then((data) => {
            dispatch(getBaseInfoSuccess(data));
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
