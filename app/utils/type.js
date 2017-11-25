/**
 * Created by zy on 2017/11/25.
 */
export function isFunction(obj) {
    return toString.call(obj) === '[object Function]';
}

export function isString(obj) {
    return toString.call(obj) === '[object String]';
}

export function isObject(obj) {
    let type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}