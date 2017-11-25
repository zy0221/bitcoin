/**
 * Created by zy on 2017/11/25.
 */

const prefix = 'TRADE_'
const ACTION_NAME = {
    ADD_COUNT: `${prefix}_ADD_COUNT`,
}

function increment(value = 1) {
    return {
        type: ACTION_NAME.ADD_COUNT,
        payload: value,
    }
}

function incrementToS(value = 1) {
    return (dispatch, getState) => {
        console.log(getState());
        setTimeout(()=> {
            dispatch(increment(value));
        }, 2000)
    }
}

const ACTION_FUNCS = {
    increment,
    incrementToS
}

export{
    ACTION_NAME,
    ACTION_FUNCS
}