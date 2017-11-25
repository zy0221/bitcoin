/**
 * Created by zy on 2017/11/25.
 */

import qs from 'querystring';
import { isObject, isFunction } from './type';

const defaultError = '您的网络不稳定，请稍后重试';
function NetServer(){
}

NetServer.prototype._rootUrl = '/21BitCoinSer';
NetServer.prototype._errorMap = {
}

NetServer.prototype.generateUrl = function (url, params, hash) {
    const query = qs.stringify(params);
    if(query){
        if(url.indexOf('?') === -1){
            url += '?'
        } else {
            url += '&';
        }
    }
    url += query;
    if(hash){
        url += `#${hash}`;
    }
    return url;
}


NetServer.prototype.getData = function (url, query, errorMap, options) {
    if(url.charAt(0) !== '/'){
        url = `/${url}`;
    }
    url = this.generateUrl(`${this._rootUrl}${url}`, query);
    const errMap = Object.assign({}, this._errorMap, errorMap);
    return window.fetch(url, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(checkHttpStatus).then(parseJSON).then((json)=>{
        parseData(json, errMap);
    }).catch((e) => {
        console.log(e);
        throw new Error(defaultError);
    });
}

NetServer.prototype.postData = function (url, data, errorMap, options) {
    if(url.charAt(0) !== '/'){
        url = `/${url}`;
    }
    url = `${this._rootUrl}${url}`;
    const errMap = Object.assign({}, this._errorMap, errorMap);
    return window.fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(checkHttpStatus).then(parseJSON).then((json)=>{
        parseData(json, errMap);
    }).catch((e) => {
        console.log(e);
        throw new Error(defaultError);
    });
    
}

export default NetServer;



function checkHttpStatus(response) {
    if (response && response.status >= 200 && response.status < 300) {
        return response;
    }
    if (response && (response.ok || response.response)) {
        return response;
    }
    let error = new Error(defaultError);
    error.response = response;
    throw error;
}


function parseJSON(response) {
    if (isObject(response.response)) return response.response;
    if (isFunction(response.text)) {
        return response.text().then(function(text) {
            return JSON.parse(text.replace(/^[^{\(]*?\(/, '').replace(/\);?$/, ''));
        });
    } else if (isFunction(response.json)) {
        return response.json();
    }
    return response;
}

function parseData(json, errMap) {
    if(!json){
        throw new Error(defaultError);
        return;
    }
    if(!(json.code == 200)){
        const eMsg = errMap[json.code] || defaultError;
        throw new Error(eMsg);
        return;
    }
    return json.data;
}