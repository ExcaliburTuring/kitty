import React from 'react'; 
import { Row, Col, Image } from 'react-bootstrap';

import { orderStatus } from 'config';
import Title from 'title';
import OrderTip from 'order_tip';

var OrderItem = React.createClass({

    render: function() {
        var order = this.props.order;
        var title = "";
        var status ="";
        var pay="";
        var groupinfo="";
        var orderclass="order";
        var avatars = "";

        if(order.status == orderStatus.WAITING){
            title = "未完成订单";
            status = "未支付";
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
           // orderclass ="invisible";
        }

        return (
            <div className={`order-brief-container ${orderclass}`}>
                <Title className="order-brief-title" title={`订单号：${order.orderid}`}
                    href={`/order/${order.orderid}`}>
                    <p className="order-status-tip">
                        订单状态:
                        <span className="order-status">
                            {orderStatus.getDesc(order.status)}
                        </span>
                    </p>
                    <OrderTip 
                        orderStatus={order.status}
                        timeLeft={order.timeLeft} />
                </Title>
                <div className="order-brief-content">
                    <Row>
                        <Col sm={4} md={4}>
                            <div className="travel-info">
                                <a href={`/travel/${order.routeid}`} target="_blank">
                                    <Image src={order.headImg} responsive/>
                                </a>
                                <div className="travel-content">
                                    <span className="travel-name">
                                        {order.name}
                                    </span>
                                    <span className="travel-time">
                                        {order.startDate} 到 {order.endDate}
                                    </span>
                                    <p>
                                        {order.title}
                                    </p>
                                    <p className="travel-price">
                                        {order.price}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            <div className="order-info">
                                <TravellerList names={order.travellerNames} keyPrefix={order.orderid}/>
                            </div>
                        </Col>

                        
                    </Row>
                </div>
                {groupinfo}
            </div>
        );
    }
});

var TravellerList = React.createClass({

    render: function() {
        var keyPrefix = this.props.keyPrefix;
        var travellers = this.props.names.map(function(name, index) {
            return (
                <span key={`${keyPrefix}-${index}`} className="ellipsis">
                    <i className="fa fa-check-square-o" />
                    {name}
                </span>
            );
        });
        return (
            <div className="traveller-names">
                <span>出行人员：</span>
                {travellers}
            </div>
        );
    }
});

module.exports = OrderItem;
/**
<Col sm={2} md={2}>
                            <div className="travel-info">
                                
                                <div className="order-status">
                                    {pay}
                                </div>
                            </div>
                        </Col>
*/