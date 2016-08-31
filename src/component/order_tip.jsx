/**
 * @author xiezhenzong
 */
import React from 'react';

import { orderStatus } from 'config';

var OrderTip = React.createClass({

    _countdown: function() {
        this.setState({
            'timeLeft': this.state.timeLeft - 1
        });
    },

    getInitialState: function() {
        return {
            'timeLeft': this.props.timeLeft
        };
    },

    componentDidMount: function() {
        this._countdown();
        setInterval(this._countdown, 1000);
    },

    render: function() {
        if (this.props.orderStatus == orderStatus.WAITING) {
            var timeLeft = this.state.timeLeft;
            var hour = Math.floor(timeLeft / 3600);
            var minute = Math.floor((timeLeft - hour * 3600) / 60);
            var second = timeLeft - hour * 3600 - minute * 60;

            return (
                <p className="order-tip">还剩余：
                    <span className="order-countdown">{hour}</span>小时
                    <span className="order-countdown">{minute}</span>分钟
                    <span className="order-countdown">{second}</span>秒
                </p>
            );
        } else {

        }
        return null;
    }

});

module.exports = OrderTip;
