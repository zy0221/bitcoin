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

export default {
    getUrlInfo,
    getQueryParams
}