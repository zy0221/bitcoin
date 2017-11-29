/**
 * Created by zy on 2017/11/26.
 */
import { ACTION_NAME } from './action';
import NET_STATUS from '../constants/netStatus';

function reducer(state = '', action = {}) {
    switch (action.type) {
        case ACTION_NAME.GET_BASE_INFO_REQUEST :
            return Object.assign({}, state, {
                userInfoLoadStatus: NET_STATUS.DOING,
            });
        case ACTION_NAME.GET_BASE_INFO_SUCCESS :
            return Object.assign({}, state, {
                userInfoLoadStatus: NET_STATUS.SUCCESS,
                userInfo: action.payload
            });
        case ACTION_NAME.GET_BASE_INFO_FAIL :
            return Object.assign({}, state, {
                userInfoLoadStatus: NET_STATUS.FAIL,
            });
        default:
            return state
    }
};

export default reducer
