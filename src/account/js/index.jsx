/**
 * @author xiezhenzong
 */
import React from 'react'; 
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';

import Rabbit from 'rabbit';
import AccountBasicInfo from 'account_basicinfo';
import { defaultValue, url } from 'config';
import Title from 'title';
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
        OrderBrief.actions.load({'orderType': 0});
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
        var accountInfo = this.state.basicInfo.accountInfo;
        if (accountInfo == null) {
            return (<NoLogin/>);
        }
        var data = this.state.data;
        if (data.status != 0) {
            <div>
                <p>订单查询失败, 请联系客服： {defaultValue.hotline}</p>
            </div>
        }

        var ordersList = null;
        if (data.briefOrders != null && data.briefOrders.length > 0) {
            ordersList = data.briefOrders.map(function(order) {
                return (
                        <OrderItem order={order} key={order.orderid}/>
                );
            });
        } else {
            ordersList = (
                <div className="no-result">
                    <p>暂时没有任何订单</p>
                </div>
            );
        }
        return (
            <div className="index-container">
                <Grid>
                    <Row>
                        <Col sm={3} md={3}>
                            <div className="profiles">
                                <div className="name">
                                   {accountInfo.nickname}
                                </div>
                                <div className="discount">
                                    <div className="left"><span>优惠券：0</span></div>
                                    <div className="right">红包：0</div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={9} md={9}>
                            <Title title={`${accountInfo.nickname}的订单：`} className="index-title">
                                <span className="bar">未完成：</span>
                                <span className="order-count">{data.currentOrderCount}</span>
                                <span className="bar">历史：</span>
                                <span className="order-count">{data.historyOrderCount}</span>
                                <span className="bar">所有：</span>
                                <span className="order-count">{data.historyOrderCount}</span>
                                <p></p>
                            </Title>
                            <div className="order-container">
                                {ordersList}
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

module.exports = Index;
