/**
 * Created by zy on 2017/11/25.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../../components/common/header/index';
import Breadcrumb from '../../components/common/breadcrumb/index';
import ROUTER from '../../constants/router';
import UserLeft from '../../components/user/index-left';

import './settings.less'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.breadcrumbPath = [{
            name: '个人中心',
            url: ROUTER.USER_INDEX
        }, {
            name: '账户设置',
            url: ''
        }];
    }
    render(){
        return (<div className="bt-layout-page">
            <Header></Header>
            <Breadcrumb path={this.breadcrumbPath}></Breadcrumb>
            <div className="bt-layout-page-center">
                <div className="user-page-container">
                    <UserLeft curactive="2"></UserLeft>
                    个人中心
                </div>

            </div>
        </div>)
    }
}

App.PropTypes = {
}


function mapStateToProps(state) {
    return {
    }
}

const mapActionCreators = {
}


export default connect(mapStateToProps, mapActionCreators)(App);
