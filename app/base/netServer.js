/**
 * Created by zy on 2017/11/25.
 */
import NetServer from '../utils/NetServer';

const netServer = new NetServer();
netServer.checkoutLogin = function (query) {
    return this.getData('/index.html', query, {}).then((data)=>{
        return data;
    })
}

export default netServer;