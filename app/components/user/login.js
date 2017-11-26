/**
 * Created by zy on 2017/11/26.
 */
/**
 * Created by zy on 2017/11/25.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class component extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.submitClick = this.submitClick.bind(this);
    }
    render(){
        return (<div className="bt-com-user-login">
           login
            <button onClick={this.submitClick}>submit</button>
        </div>)
    }
    submitClick(){
        this.props.onLogin({
            userName: 'zhangyan',
            password: '12345'
        });
    }
}

Component.PropTypes = {
    onLogin: PropTypes.func.isRequired,
    netstatus: PropTypes.symbol
}

export default component;