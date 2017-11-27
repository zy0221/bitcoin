/**
 * Created by zy on 2017/11/27.
 */

import url from 'url';
import qs from 'querystring';

function getUrlInfo() {
    return url.parse(window.location.href);
}
function getQueryParams() {
    const queryUrl = url.parse(window.location.href).query;
    return qs.parse(queryUrl);
}
function getModuleInfo() {
    const pathname = getUrlInfo().pathname;
    let moduleName = pathname.substring(1).split('.')[0].split('_')[0];
    moduleName = moduleName.toUpperCase();
    if(moduleName === 'INDEX'){
        moduleName === 'TRADE';
    }
    return {
        name: moduleName,
    }
}
export default {
    getUrlInfo,
    getQueryParams,
    getModuleInfo
}