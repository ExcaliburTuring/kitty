/**
 * @author xiezhenzong
 */
import React from 'react';

import { orderStatus, defaultValue } from 'config';

var OrderTip = React.createClass({

    _countdown: function() {
        this.setState({
            'timeLeft': this.state.timeLeft - 1
        });
    },

    getInitialState: function() {
        return {
            'timeLeft': this.props.timeLeft,
            'dayLeft': this.props.dayLeft
        };
    },

    componentDidMount: function() {
        if (this.props.status == orderStatus.WAITING && this.state.timeLeft) {
            this._countdown();
            setInterval(this._countdown, 950); // 50毫秒是为了前端渲染时间，之前设1000总是比实际时间慢点
        }
    },

    render: function() {
        var status = this.props.status;
        if (status == orderStatus.WAITING && this.state.timeLeft) {
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
        } else if (status == orderStatus.PAID && this.state.dayLeft) {
            if (this.state.dayLeft < 0) {
                return (
                    <p className="order-tip">已经出发</p>
                );
            } else {
                return (
                    <p className="order-tip">离出发还有：
                        <span className="order-countdown">{this.state.dayLeft}</span>天
                    </p>
                );
            }
        } else if (status == orderStatus.TIMEOUT) {
            return (
                <p className="order-tip">订单
                    <span className="order-countdown">2</span>小时内未完成支付
                </p>
            );
        } else if (status == orderStatus.CLOSED) {
            return (
                <p className="order-tip">行程取消，可联系海逍遥
                    <span className="order-countdown">{defaultValue.hotline}</span>
                </p>
            );
        } else {
            return null;
        }
    }
});

module.exports = OrderTip;
