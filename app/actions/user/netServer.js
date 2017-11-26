/**
 * Created by zy on 2017/11/25.
 */
import NetServer from '../../utils/NetServer';

const netServer = new NetServer();
netServer.login = function (query) {
    return new Promise((resolve, reject)=>{
        if(query && query.userName === 'zhangyan' && query.password == '123456'){
            resolve(query);
        }else {
            throw new Error('用户名或者密码错误');
        }
    })
}

export default netServer;