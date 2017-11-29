/**
 * Created by zy on 2017/11/29.
 */


import React, {Component} from 'react'
import {connect} from 'react-redux'
import cs from 'classnames';
import ROUTER from '../../constants/router'

import './index-left.less';

class component extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div className="bt-com-user-index-left">
            <div className="profile">
                <img src={this.props.userInfo.profile}/>
            </div>
            <div className="user-name">
                {this.props.userInfo.userName}
            </div>
            <div className="user-email">
                {this.props.userInfo.email}
            </div>
            <div className="space-line"></div>
            <div className="menu">
                {(this.props.curactive == 1) ?
                    <a className="bt-btn bt-btn-info">账户信息</a> :
                    <a className="bt-btn bt-btn-hover" href={ROUTER.USER_INDEX}>账户信息</a>
                }
            </div>
            <div className="menu">
                {(this.props.curactive == 2) ?
                    <a className="bt-btn bt-btn-info">账户设置</a> :
                    <a className="bt-btn bt-btn-hover" href={ROUTER.USER_SETTINGS}>账户设置</a>
                }
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