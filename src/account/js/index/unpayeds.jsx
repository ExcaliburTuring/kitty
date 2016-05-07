import React from 'react'; 
import { Col, Image } from 'react-bootstrap';

import TravellerList from './travellers';

var UnpayedList = React.createClass({

    render: function() {
        var unpayeds = this.props.unPayed.map(function(order, index) {
            return (
                <div className="unpayed" key={`order-name-${index}`}>
                    <div className="start-title">
                        <Col md={4}>
                            <p className="left">未完成订单</p>
                        </Col>
                        <Col md={4}>
                            <p className="middle">订单号：{order.orderid}</p>
                        </Col>
                        <Col md={4}>
                            <p className="right">创建时间:{order.starttime}</p>
                        </Col>
                    </div>
                    <div className="order-info">
                        <Col md={4}>
                            <div className="travel-img">
                                <Image src={order.image} responsive/>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="travel-info">
                                <div className="travel-name">
                                    {order.name}
                                </div>
                                <div className="travel-intro">
                                    {order.intro}
                                </div>
                                <div className="travel-time">
                                    {order.time}
                                </div>
                                <div className="travel-price">
                                    ￥{order.price}
                                </div>
                                <div className="order-status">
                                    订单状态：{order.status}
                                </div>
                                <div className="pay">
                                </div>
                            </div>
                        </Col>
                        <Col md={2}>
                            <TravellerList
                                names={order.names}
                                keyPrefix="unPayed"/>
                        </Col>
                    </div>
                </div>
            )
        });


        return (
            <div>
                {unpayeds}
            </div>
        );
    }
});

module.exports = UnpayedList;
