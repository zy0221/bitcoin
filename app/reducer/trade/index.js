/**
 * Created by zy on 2017/11/25.
 */

import { ACTION_NAME } from '../../actions/trade/index';


function reducer(state = '', action = {}) {
    switch (action.type) {
        case ACTION_NAME.ADD_COUNT :
            return Object.assign({}, state, {
                count: state.count + action.payload
            });
        default:
            return state
    }
};

export default reducer
