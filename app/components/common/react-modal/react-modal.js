/**
 * Created by zy on 2017/11/26.
 */
import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './react-modal.less'
class ModalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            transition: 'fade'
        };
        this.hide = this.hide.bind(this);
    }

    render() {
        return (<div style={this.style} className="bt-com-react-modal">
            <ReactCSSTransitionGroup
                transitionName={this.state.transition}
                transitionEnterTimeout={250}
                transitionLeaveTimeout={50}>
                {(this.state.show ) ?
                    <div className="cover">
                        <div className="wrap">
                            {(this.props.title ) ?
                                <div className="title">
                                    {this.props.title}
                                </div> : null
                            }
                            <div className="close-btn">
                                <i onClick={this.hide} className="bt-ic-cross"></i>
                            </div>
                            {this.props.children}
                        </div>
                    </div> : null
                }</ReactCSSTransitionGroup>
        </div>)
    }

    hide() {
        this.setState({
            show: false
        });
    }

    show() {
        this.setState({
            show: true
        });
    }
}

export default ModalContainer;