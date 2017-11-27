import React, {Component} from 'react'
import {connect} from 'react-redux'
import urlUtils from '../../../utils/urlUtils'
import cs from 'classnames';
import ROUTER from  '../../../constants/router'

import './index.less';

const moduleName = urlUtils.getModuleInfo().name;
class component extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div className="bt-com-header">
            <div className="bt-layout-page-center bt-float-clear">
                <div className="logo">LOGO</div>
                <a href={ROUTER.TRADE_INDEX}>
                    <div className={cs({
                        "menu": true,
                        "active": moduleName === 'TRADE'
                    })}>交易中心
                    </div>
                </a>
                <a>
                    <div className={cs({
                        "menu": true,
                        "active": moduleName === 'AD'
                    })}>发布广告
                    </div>
                </a>

                {(this.props.userInfo.userName) ?
                    <div className="menu-right-user">
                        <span className="item hover">
                            <i className="bt-ic-bell"></i>
                        </span>
                        <span className="item">
                            <i className="bt-ic-bit">
                                <span className="value">{this.props.userInfo.btc}</span>
                            </i>
                        </span>
                        <span className="item hover">
                            <i className="bt-ic-user"></i><i className="bt-ic-tri-down"></i>
                            <div className="entries">
                                <div className="panel">
                                    <a href={ROUTER.USER_INDEX}><div className="entry upper">个人中心</div></a>
                                    <a><div className="entry">个人资产</div></a>
                                </div>
                            </div>
                        </span>
                    </div> :<div className="menu-right">
                        <a href={ROUTER.USER_LOGIN}>登录</a>
                        <a className="bt-btn bt-btn-info" href={ROUTER.USER_REGISTER}>免费注册</a>
                    </div>}
            </div>
        </div>)
    }
}


function mapStateToProps(state) {
    return {
        userInfo: state.base.userInfo,
    }
}

const mapActionCreators = {}


export default connect(mapStateToProps, mapActionCreators)(component);