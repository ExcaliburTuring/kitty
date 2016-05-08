/**
 * @author xiezhenzong
 */
import React from 'react'; 
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';

import Rabbit from 'rabbit';
import { defaultValue, url } from 'config';
import OrderList from './order/orders';

var BasicInfo = Rabbit.create(url.info);
var OrderInfo = Rabbit.create(url.orderBrief); 

var Index = React.createClass({

    mixins: [Reflux.connect(BasicInfo.store, 'info'),Reflux.connect(OrderInfo.store, 'data')],

    getInitialState: function() {
        BasicInfo.actions.load({'accountid': 1});
        OrderInfo.actions.load({'accountid': 10001,'orderType':'CURRENT'});
        return {
            'info': {
                'status': 0,
                'login': false,
                'accountInfo': [],
                'accountSetting': []
            },
            'data': {
                'status': 1,
                'briefOrders': [],
                'currentOrders': 0,
                'historyOrders': 0
            }
        };
    },

    render: function() {
        var info = this.state.info;
        var orders = this.state.data.briefOrders;
        var { accountid } = this.props.params;
        var ordersUrl = `${defaultValue.accountUrl}/${accountid}/orders`;
        var infoUrl = `${defaultValue.accountUrl}/${accountid}/info`;
       
        var ordersList = orders.map(function(order) {
            return (
                    <OrderList order={order} key={order.orderid}/>
            );
        });

        return (
            <div className="my-container">
                <div className="container">
                    <Col md={3}>
                        <div className="profiles">
                            <div className="">
                                <p><i className="fa fa-male"/>{info.accountInfo.name}</p>
                                <p><i className="fa fa-mobile"/>{info.accountInfo.mobile}</p>
                                <p><i className="fa fa-birthday-cake"/>{info.accountSetting.birthday}</p>
                            </div>
                            <a href={infoUrl} activeClassName="active">编辑资料</a>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="title">
                            <Col md={5}>
                                <div className="welcome">
                                    欢迎回来，{info.accountInfo.name}
                                </div>
                            </Col>
                            <div className="messages">
                                <Col md={3}>
                                    <span className="bar">未完成订单：</span>
                                    <span className="unfinished">{this.state.data.currentOrders}</span>
                                </Col>
                                <Col md={3}>
                                    <span className="bar">历史订单：</span>
                                    <span className="histories">{this.state.data.historyOrders}</span>
                                </Col>
                            </div>
                        </div>
                        <div className="unfinisheds">
                            <div className="order-container">
                                {ordersList}
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
        );
    }
});

module.exports = Index;
