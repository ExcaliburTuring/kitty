/**
 * @author xiezhenzong
 */
import React from 'react'; 
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Progress, Button, message } from 'antd';
const ProgressLine = Progress.Line;

import Rabbit from 'rabbit';
import { defaultValue, url, orderType } from 'config';
import Title from 'title';
import CouponTable from 'coupon';
import OrderItem from './order/order';

var OrderBrief = Rabbit.create(url.orderBrief);
var Coupons = Rabbit.create(url.coupons);
var Index = React.createClass({

    orderType: orderType.CURRENT,

    mixins: [
        Reflux.connect(OrderBrief.store, 'data'),
        Reflux.connect(Coupons.store, 'coupons')
    ],

    // callback method

    onSelectOrderType: function(type) {
        if (this.orderType == type) {
            return;
        }
        OrderBrief.actions.load({'orderType': type});
        this.orderType = type;
    },

    onCouponValidateClick: function() {
        var discountCode = this.refs.discountCodeInput.value;
        if (!discountCode) {
            return;
        }
        var self = this;
        $.get(url.discountCodeValidate, {'code': discountCode})
        .done(function(data) {
            if (data.status == 0 ){
                message.success('此优惠码兑换成成功');
                Coupons.actions.load();
            } else if (data.status == 1100) {
                message.error(data.errors[0].message);
            } else {
                message.error(`优惠码校验失败，请联系${defaultValue.hotline}`);
            }
        })
        .fail(function() {
            message.error(`优惠码校验失败，请联系${defaultValue.hotline}`);
        });
    },

    // compoment specs

    getInitialState: function() {
        OrderBrief.actions.load({'orderType': orderType.CURRENT});
        Coupons.actions.load();
        return {
            'basicInfo': {},
            'data': {
                'status': 1,
                'briefOrders': [],
                'currentOrderCount': 0,
                'historyOrderCount': 0
            },
            'coupons': {
                'coupons': [],
                'count': 0
            }
        };
    },

    render: function() {
        var accountInfo = this.props.accountInfo;
        var data = this.state.data;
        if (data.status != 0) {
            return (
                <div>
                    <ProgressLine percent={50}/>
                </div>
            );
        }
        var ordersList = null;
        if (data.briefOrders != null && data.briefOrders.length > 0) {
            ordersList = data.briefOrders.map(function(order) {
                return (
                    <OrderItem briefOrder={order} key={order.orderInfo.orderid}/>
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
                                <div className="detail">
                                    <div className="left">
                                        优惠券：
                                        <CouponTable placement="bottom"
                                            coupons={this.state.coupons}>
                                            <span className="coupons-count">
                                                {this.state.coupons.count}
                                            </span>
                                        </CouponTable>
                                    </div>
                                </div>
                            </div>
                            <div className="discountcode-validate-container">
                                <p>优惠码兑换</p>
                                <input ref="discountCodeInput" type="text" placeholder="请输入优惠码"/>
                                <Button size="small" onClick={this.onCouponValidateClick}>点击兑换</Button>
                            </div>
                        </Col>
                        <Col sm={9} md={9}>
                            <Title title={`${accountInfo.nickname}的订单：`} className="index-title">
                                <span className="bar">当前：</span>
                                <a onClick={()=>{this.onSelectOrderType(orderType.CURRENT);}} className="order-count">
                                    {data.currentOrderCount}
                                </a>
                                <span className="bar">历史：</span>
                                <a onClick={()=>{this.onSelectOrderType(orderType.HISTORY);}} className="order-count">
                                    {data.historyOrderCount}
                                </a>
                                <span className="bar">所有：</span>
                                <a onClick={()=>{this.onSelectOrderType(orderType.VISIBLE);}} className="order-count">
                                    {data.allOrderCount}
                                </a>
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
