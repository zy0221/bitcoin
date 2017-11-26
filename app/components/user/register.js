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
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            passwordSecond: '',
            passwordSecondError: '',
        }
        this.userNameCheck = this.userNameCheck.bind(this);
        this.emailCheck = this.emailCheck.bind(this);
        this.passwordCheck = this.passwordCheck.bind(this);
        this.passwordSecondCheck = this.passwordSecondCheck.bind(this);
        this.submitClick = this.submitClick.bind(this);
    }

    render() {
        return (<div className="bt-com-user-login">
            <AlertContainer ref={a => this.altMsg = a}/>
            <div className="item-field">
                <div className="input-icon">
                    <i className="bt-ic-user"></i>
                </div>
                <input value={this.state.userName} type="text"
                       name="userName" ref="userName" placeholder="用户名"
                       onChange={this.userNameCheck.bind(this, 'INPUT')}
                       onBlur={this.userNameCheck.bind(this, 'BLUR')}/>
                {(this.state.userNameError ) ? <div className="bt-form-item-error">
                    {this.state.userNameError}
                </div>: null}
            </div>
            <div className="item-field">
                <div className="input-icon">
                    <i className="bt-ic-mail3"></i>
                </div>
                <input value={this.state.email} type="text"
                       name="email" ref="email" placeholder="邮箱"
                       onChange={this.emailCheck.bind(this, 'INPUT')}
                       onBlur={this.emailCheck.bind(this, 'BLUR')}/>
                {(this.state.emailError ) ? <div className="bt-form-item-error">
                    {this.state.emailError}
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
                <div className="input-icon">
                    <i className="bt-ic-lock"></i>
                </div>
                <input value={this.state.passwordSecond} type="password"
                       name="passwordSecond" ref="passwordSecond" placeholder="确认密码"
                       onChange={this.passwordSecondCheck.bind(this, 'INPUT')}
                       onBlur={this.passwordSecondCheck.bind(this, 'BLUR')}/>
                {(this.state.passwordSecondError ) ? <div className="bt-form-item-error">
                    {this.state.passwordSecondError}
                </div>: null}
            </div>
            <div className="item-field">
                <button onClick={this.submitClick} className={cs({
                    "bt-btn": true,
                    "bt-btn-info": true,
                    "bt-btn-waiting": this.submitDisable()
                })}>注册</button>
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
        if(!this.userNameCheck() && !this.emailCheck()
            && !this.passwordCheck() && !this.passwordSecondCheck()){
            this.props.onRegister({
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password
            }).then(() => {
                this.altMsg.success('注册成功，即将跳转到登录页');
                setTimeout(()=>{
                    window.location.href = ROUTER.USER_LOGIN;
                }, 3000);
            }).catch((e) => {
                e && this.altMsg.error(e.message);
            });
        }
    }
    userNameCheck(eventName){
        let sCheck = false;
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
                eMsg = "用户名不能为空"
            }else if(value.length > 10){
                eMsg = "用户名不能超过10位"
            }
            this.setState({
                userNameError: eMsg
            })
        }
        return eMsg;
    }
    emailCheck(eventName){
        let sCheck = false;
        const value = this.refs.email.value.toString().trim();

        if(eventName === 'INPUT'){
            if(value !== this.state.email){
                this.setState({
                    email: value
                })
                if(this.state.emailError){
                    sCheck = true;
                }
            }
        }else {
            sCheck = true;
        }
        let eMsg = ''
        if(sCheck){
            if(value === ''){
                eMsg = "邮箱不能为空"
            }else if(value.indexOf('@') === -1){
                eMsg = "邮箱格式不正确"
            }
            this.setState({
                emailError: eMsg
            })
        }
        return eMsg;
    }
    passwordCheck(eventName){
        let sCheck = false;
        const value = this.refs.password.value.toString().trim();
        if(eventName === 'INPUT'){
            if(value !== this.state.password){
                this.setState({
                    password: value.slice(0,16)
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
                eMsg = "密码不能为空"
            }else if(value.length < 6){
                eMsg = "密码不能少于6位"
            }
            this.setState({
                passwordError: eMsg
            })
        }
        return eMsg;
    }
    passwordSecondCheck(eventName){
        let sCheck = false;
        const value = this.refs.passwordSecond.value.toString().trim();
        if(eventName === 'INPUT'){
            if(value !== this.state.passwordSecond){
                this.setState({
                    passwordSecond: value.slice(0,16)
                })
                if(this.state.passwordSecondError){
                    sCheck = true;
                }
            }
        }else {
            sCheck = true;
        }
        let eMsg = ''
        if(sCheck){
            if(value === ''){
                eMsg = "密码不能为空"
            }else if(value.length < 6){
                eMsg = "密码不能少于6位"
            }else if(this.state.password && this.state.password !== value){
                eMsg = "两次密码输入不同"
            }
            this.setState({
                passwordSecondError: eMsg
            })
        }
        return eMsg;
    }
}
export default component;