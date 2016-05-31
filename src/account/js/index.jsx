/**
 * @author xiezhenzong
 */
import React from 'react'; 
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';

import Rabbit from 'rabbit';
import AccountBasicInfo from 'account_basicinfo';
import { defaultValue, url } from 'config';
import OrderItem from './order/order';
import NoLogin from './nologin'; 

var OrderBrief = Rabbit.create(url.orderBrief); 
var Index = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(OrderBrief.store, 'data')
    ],

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        OrderBrief.actions.load({'orderType':'CURRENT'});
        return {
            'basicInfo': {},
            'data': {
                'status': 1,
                'briefOrders': [],
                'currentOrderCount': 0,
                'historyOrderCount': 0
            }
        };
    },

    render: function() {
        var basicInfo = this.state.basicInfo;
        if (basicInfo.accountInfo == null) {
            return (<NoLogin/>);
        }
        var data = this.state.data;
        if (data.status != 0) {
            <div>
                <p>订单查询失败, 请联系客服： 15001028030</p>
            </div>
        }
        var accountInfo = basicInfo.accountInfo;
        var accountSetting = basicInfo.accountSetting;
        var accountid = accountInfo.accountid;
        var infoUrl = `${url.account}/${accountid}/info`;
        var ordersUrl = `${url.account}/${accountid}/orders`;
       
        var ordersList = null;
        if (data.briefOrders != null && data.briefOrders.length > 0) {
            ordersList = data.briefOrders.map(function(order) {
                return (
                        <OrderItem order={order} key={order.orderid}/>
                );
            });
        } else {
            ordersList = (
                <div>暂时没有任何订单</div>
            );
        }
        return (
            <Grid>
                <Row>
                    <div className="my-container">
                        <Col md={3}>
                            <div className="profiles">
                                <div className="">
                                    <p><i className="fa fa-male"/>{accountInfo.name}</p>
                                    <p><i className="fa fa-mobile"/>{accountInfo.mobile}</p>
                                    <p><i className="fa fa-birthday-cake"/>{accountSetting.birthday}</p>
                                </div>
                                <a href={infoUrl} activeClassName="active">编辑资料</a>
                            </div>
                        </Col>
                        <Col md={9}>
                            <div className="title">
                                <Col md={5}>
                                    <div className="welcome">
                                        欢迎回来，{accountInfo.name}
                                    </div>
                                </Col>
                                <div className="messages">
                                    <Col md={3}>
                                        <span className="bar">未完成订单：</span>
                                        <span className="unfinished">{data.currentOrderCount}</span>
                                    </Col>
                                    <Col md={3}>
                                        <span className="bar">历史订单：</span>
                                        <span className="histories">{data.historyOrderCount}</span>
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
                </Row>
            </Grid>
        );
    }
});

module.exports = Index;
