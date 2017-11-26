/**
 * Created by zy on 2017/11/25.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ACTION_FUNCS } from '../../actions/trade/index';
import BtCounter from '../../components/trade/counter'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            innerCount: this.props.count
        };
        this.innerClick = this.innerClick.bind(this);
    }
    componentWillMount(){
        console.log('componentWillMount');
    }
    componentDidMount(){
        console.log('componentDidMount');
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate');
        return true;
    }
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render(){
        console.log('render');
        return (<div>
            这是交易页, 公交易xx{this.props.count}
            <button onClick={this.props.increment.bind(this, 2)}>add</button>
            <button onClick={this.props.incrementToS.bind(this, 3)}>add ser</button>
            <BtCounter count={this.props.count}></BtCounter>
            <div>
                <button onClick={this.innerClick.bind(this, 1)}>{this.state.innerCount}</button>
            </div>
        </div>)
    }
    innerClick(value){
        this.state.innerCount += value;
        this.setState(this.state);
        // this.forceUpdate();
    }
}

App.PropTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func,
}


function mapStateToProps(state) {
    return {
        count: state.app.count
    }
}

const mapActionCreators = {
    increment: (int) => ACTION_FUNCS.increment(int),
    incrementToS: (int) => ACTION_FUNCS.incrementToS(int),
}


export default connect(mapStateToProps, mapActionCreators)(App);
