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
                btc: '0.0000287',
                email: 'zhangyan@qq.com',
                profile: 'http://i03.pictn.sogoucdn.com/3c28af542f2d49f7-8437bbc8e07dde51-11647079a9016176191b4faf47e3d597_qq',
            })
        }, 0)
    })
    /*return this.getData('/index.html', query, {}).then((data)=>{
        return data;
    })*/
}

export default netServer;