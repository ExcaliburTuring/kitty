import React from 'react'; 
import { Col, Image } from 'react-bootstrap';

import { orderStatus } from 'config';
import Title from 'title';
import TravellerList from './travellers';

var OrderItem = React.createClass({

    render: function() {
        var order = this.props.order;
        var title = "";
        var status ="";
        var minutecount=(<p/>);
        var price="";
        var pay="";
        var groupinfo="";
        var orderclass="order";
        var avatars = "";

        if(order.status == orderStatus.WAITING){
            title = "未完成订单";
            status = "未支付";
            minutecount = (<p className="right">支付剩余时间:{order.minuteCount}分钟</p>);
            price = order.actualPrice;
            pay = ( 
                <div>
                    <a className="pay">去支付</a>
                    <a className="cancel">取消</a>
                </div>
            );
        }else if(order.status == orderStatus.PAYING){
            title="支付中订单";
            status ="支付中";
        }else if(order.status == orderStatus.PAID){
            title="即将出行";
            status ="已支付";
            orderclass = "order startorder",
            avatars = order.avatars.map(function(avatar, index) {
                return (
                    <Image src={avatar}  circle key={`avatar-${index}`}/>
                );
            });

            groupinfo = (
                <div className="group-info">
                    <Col sm={4} md={4}>
                    <div className="travel-countdown">
                        <p className="countdown-title">距离出发还有：</p>
                        <p className="countdown">{order.dayCount}天</p>
                    </div>
                    </Col>
                    <Col sm={4} md={4}>
                        <div className="group-members">
                            <p>当前队伍中的队友：</p>
                            <div className="avatars">{avatars}</div>
                            <p className="more">扫码进群查看更多<i className="fa fa-arrow-right" /></p>
                        </div>
                    </Col>
                    <Col sm={4} md={4}>
                        <div className="group-QR">
                            <Image src={order.wxQrCode} responsive />
                        </div>
                    </Col>
                </div>
            )
        }else if(order.status == orderStatus.REFOUNDING){
            title="退款订单";
            status ="退款中";
        }else if(order.status == orderStatus.REFOUNDED){
            title="退款订单";
            status ="退款完成";
        }else if(order.status == orderStatus.FINISH){
            title="历史订单";
            status ="已完成";
            orderclass ="order history";
        }else{
            orderclass ="invisible";
        }

        return (
            <div className={`order-brief-container ${orderclass}`}>
                <Title className="start-title" title={`订单号：${order.orderid}`}
                    href={`/order/${order.orderid}`}>
                    <OrderTip 
                        orderStatus={this.props.order.status}
                        timeLeft={this.props.order.timeLeft} />
                </Title>
                <div className="order-info">
                    <Col sm={4} md={4}>
                        <div className="travel-img">
                            <a href={`/travel/${order.routeid}`} target="_blank">
                                <Image src={order.headImg} responsive/>
                            </a>
                        </div>
                    </Col>
                    <Col sm={6} md={6}>
                        <div className="travel-info">
                            <div className="travel-name">
                                {order.name}
                            </div>
                            <div className="travel-time">
                                {order.startDate} 到 {order.endDate}
                            </div>
                            <div className="travel-price">
                                {price}
                            </div>
                            <div className="order-status">
                                订单状态：{status}
                            </div>
                        </div>
                    </Col>
                    <Col sm={2} md={2}>
                        <div className="travel-info">
                            <TravellerList
                                names={order.names}
                                keyPrefix="unPayed"/>
                            <div className="order-status">
                                {pay}
                            </div>
                        </div>
                    </Col>
                </div>
                {groupinfo}
            </div>
        );
    }
});

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

module.exports = OrderItem;
