/**
 * Created by zy on 2017/11/27.
 */
function getEmptyResolve(data) {
    return new Promise((resolve, reject)=>{
        resolve(data);
    })
}

function getEmptyReject(data) {
    return new Promise((resolve, reject)=>{
        reject(data);
    })
}
export default {
    getEmptyResolve,
    getEmptyReject,
}