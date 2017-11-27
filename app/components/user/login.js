/**
 * Created by zy on 2017/11/26.
 * 暂时不必要封装一层表单组件， 手动验证
 * passwordCheck 可以用高阶组件， 也懒得搞了
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames';
import ROUTER from '../../constants/router'
import NET_STATUS from '../../constants/netStatus';
import AlertContainer from '../../components/common/react-alert/AlertContainer'


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
        this.userNameCheck = this.userNameCheck.bind(this);
        this.passwordCheck = this.passwordCheck.bind(this);
        this.submitClick = this.submitClick.bind(this);
    }
    render(){
        return (<div className="bt-com-user-login">
            <AlertContainer ref={a => this.altMsg = a}/>
            <div className="item-field">
                <div className="input-icon">
                    <i className="bt-ic-mail3"></i>
                </div>
                <input value={this.state.userName} type="text"
                       name="userName" ref="userName" placeholder="用户名/邮箱"
                       onChange={this.userNameCheck.bind(this, 'INPUT')}
                       onBlur={this.userNameCheck.bind(this, 'BLUR')}/>
                {(this.state.userNameError ) ? <div className="bt-form-item-error">
                    {this.state.userNameError}
                </div>: null}
            </div>
            <div className="item-field">
                <div className="input-icon">
                    <i className="bt-ic-lock"></i>
                </div>
                <input value={this.state.password} type="password"
                       name="password" ref="password" placeholder="密码"
                       onChange={this.passwordCheck.bind(this, 'INPUT')}
                       onBlur={this.passwordCheck.bind(this, 'BLUR')}/>
                {(this.state.passwordError ) ? <div className="bt-form-item-error">
                    {this.state.passwordError}
                </div>: null}
            </div>

            <div className="item-field">
                <button onClick={this.submitClick} className={cs({
                    "bt-btn": true,
                    "bt-btn-info": true,
                    "bt-btn-waiting": this.submitDisable()
                })}>登录</button>
            </div>
        </div>)
    }
    submitDisable(){
        return this.props.netstatus === NET_STATUS.DOING;
    }
    submitClick(){
        if(this.submitDisable()){
            return;
        }
        if(!this.userNameCheck() && !this.passwordCheck()){
            this.props.onLogin({
                userName: this.state.userName,
                password: this.state.password
            }).then(() => {
                window.location.href = ROUTER.INDEX;
            }).catch((e) => {
                e && this.altMsg.error(e.message);
            });
        }
    }
    userNameCheck(eventName){
        let sCheck = false;
        // 不能输入空
        const value = this.refs.userName.value.toString().trim();
        if(eventName === 'INPUT'){
            if(value !== this.state.userName){
                this.setState({
                    userName: value
                })
                if(this.state.userNameError){
                    sCheck = true;
                }
            }
        }else {
            sCheck = true;
        }
        let eMsg = ''
        if(sCheck){
            if(value === ''){
                eMsg = "请输入用户名/邮箱"
            }else if(value.indexOf('@') === -1 && value.length > 10){
                eMsg = "用户名/邮箱格式错误"
            }
            this.setState({
                userNameError: eMsg
            })
        }
        return eMsg;
    }
    passwordCheck(eventName){
        let sCheck = false;
        const value = this.refs.password.value.toString().trim().slice(0,16);
        if(eventName === 'INPUT'){
            if(value !== this.state.password){
                this.setState({
                    password: value
                })
                if(this.state.passwordError){
                    sCheck = true;
                }
            }
        }else {
            sCheck = true;
        }
        let eMsg = ''
        if(sCheck){
            if(value === ''){
                eMsg = "请输入密码"
            }
            this.setState({
                passwordError: eMsg
            })
        }
        return eMsg;
    }
}

Component.PropTypes = {
    onLogin: PropTypes.func.isRequired,
    netstatus: PropTypes.symbol,
}

export default component;