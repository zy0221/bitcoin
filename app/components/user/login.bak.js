/**
 * Created by zy on 2017/11/26.
 * 暂时不必要封装一层表单组件， 手动验证
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'


import './login.less'
class component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userNameError: '',
            password: '',
            passwordError: '',
        }
        this.submitClick = this.submitClick.bind(this);
    }
    render(){
        return (<div className="bt-com-user-login">
            <input ref="userName" name="userName" type="text"/>
            <i className="bt-ic-user"></i>
            <input type="checkbox"/>
            <input name="aaa" type="radio"/><input name="aaa" type="radio"/>
            <textarea>

            </textarea>
            <div>
                <label>
                    aaag<input type="checkbox"/>
                </label>
                <label>
                    bbbg<input type="checkbox"/>
                </label>
                <label>
                    cccg<input name="ccc" type="radio"/><input name="ccc" type="radio"/>
                </label>
            </div>


            <button className="bt-btn" onClick={this.submitClick}>submit</button>
            <button className="bt-btn bt-btn-info">submit</button>
            <button className="bt-btn bt-btn-info bt-btn-disabled">submit</button>
            <a>link</a>
        </div>)
    }
    submitClick(){
        this.props.onLogin({
            userName: 'zhangyan',
            password: '12345'
        }).then(() => {
            console.log('callcak1')
        }).catch((e) => {
            console.log('callcak')
        });
    }
}

Component.PropTypes = {
    onLogin: PropTypes.func.isRequired,
    netstatus: PropTypes.symbol,
}

export default component;