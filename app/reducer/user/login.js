/**
 * Created by zy on 2017/11/25.
 */

import { ACTION_NAME } from '../../actions/user/login';
import NET_STATUS from '../../constants/netStatus';

function reducer(state = '', action = {}) {
    switch (action.type) {
        case ACTION_NAME.LOGIN_REQUEST:
            return Object.assign({}, state, {
                loginStatus: NET_STATUS.DOING
            })
        case ACTION_NAME.LOGIN_FAIL:
            return Object.assign({}, state, {
                loginStatus: NET_STATUS.FAIL
            })
        case ACTION_NAME.REGISTER_REQUEST:{
            return Object.assign({}, state, {
                registerStatus: NET_STATUS.DOING
            })
        }
        case ACTION_NAME.REGISTER_FAIL:
            return Object.assign({}, state, {
                registerStatus: NET_STATUS.FAIL
            })
        default:
            return state
    }
};

export default reducer
