/**
 * Created by zy on 2017/11/25.
 */
console.log('run first...1234');


import url from 'url';
import qs from 'querystring';
import ROUTER from '../constants/router';
import netServer from './netServer';

const queryUrl = url.parse(window.location.href).query;
const queryParams = qs.parse(queryUrl);


netServer.checkoutLogin().then((data) => {
    console.log(data);
}).catch((e) => {
    console.log(e);
})


if(queryParams.login == 'no'){
    console.log('没有登录');
    window.location.href = ROUTER.USER_INDEX;
}
