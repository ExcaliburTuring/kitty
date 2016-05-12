/**
 * @author xiezhenzong
 */
import React from 'react'; 
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';

import Rabbit from 'rabbit';
import AccountBasicInfo from 'account_basicinfo';
import { defaultValue, url } from 'config';
import OrderList from './order/orders';

var OrderInfo = Rabbit.create(url.orderBrief); 

var Index = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(OrderInfo.store, 'data')
    ],

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        OrderInfo.actions.load({'accountid': 10001,'orderType':'CURRENT'});
        return {
            'basicInfo': {},
            'data': {
                'status': 1,
                'briefOrders': [],
                'currentOrders': 0,
                'historyOrders': 0
            }
        };
    },

    render: function() {
        var basicInfo = this.state.basicInfo;
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
                                <p><i className="fa fa-male"/>{basicInfo.accountInfo.name}</p>
                                <p><i className="fa fa-mobile"/>{basicInfo.accountInfo.mobile}</p>
                                <p><i className="fa fa-birthday-cake"/>{basicInfo.accountSetting.birthday}</p>
                            </div>
                            <a href={infoUrl} activeClassName="active">编辑资料</a>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="title">
                            <Col md={5}>
                                <div className="welcome">
                                    欢迎回来，{basicInfo.accountInfo.name}
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
