/**
 * Created by zy on 2017/11/25.
 */
import NetServer from '../utils/NetServer';

const netServer = new NetServer();
netServer.getBaseInfo = function (query) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({
                userName : 'zhangyan',
                btc: '0.0000287'
            })
        }, 1000)
    })
    /*return this.getData('/index.html', query, {}).then((data)=>{
        return data;
    })*/
}

export default netServer;