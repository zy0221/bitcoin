/**
 * Created by zy on 2017/11/26.
 */
import { ACTION_NAME } from './action';


function reducer(state = '', action = {}) {
    switch (action.type) {
        case ACTION_NAME.GET_BASE_INFO_SUCCESS :
            return Object.assign({}, state, {
                userInfo: action.payload
            });
        default:
            return state
    }
};

export default reducer
