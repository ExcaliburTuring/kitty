/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { List, Switch, Button } from 'antd-mobile';

import { priceUtil, orderStatus, url, refundStatus, refundType } from 'config';
import Rabbit from 'rabbit';
import GroupInfo from './group';
import Traveller from './traveller';
import Footer from './footer';

var OrderHistoryFlux = Rabbit.create(url.orderHistory);

var OrderShow = React.createClass({

    mixins: [Reflux.connect(OrderHistoryFlux.store, 'data')],

    _split: function(value) {
        return value == null ? [] : value.split(';');
    },

    getInitialState: function() {
        OrderHistoryFlux.actions.load({'orderid': this.props.orderInfoData.orderInfo.orderid});
        return {
            'data': {
                'history': []
            }
        }
    },

    render: function () {
        var orderInfoData = this.props.orderInfoData;
        var orderInfo = orderInfoData.orderInfo;
        var travellerList = orderInfoData.orderTravellers.map(function(traveller, index) {
            return (
                <Traveller traveller={traveller} key={index} readOnly/>
            );
        });
        var roommateList = orderInfoData.orderTravellers.map(function(traveller, index) {
            return (
                <List.Item extra={traveller.roommate ? traveller.roommate : '未设置'} 
                    key={index}>
                    {traveller.name}
                </List.Item>
            );
        });
        var emergencyList = [];
        var emergencyContacts = this._split(orderInfo.emergencyContact);
        var emergencyMobiles = this._split(orderInfo.emergencyMobile);
        for (var i = 0, n = emergencyContacts.length; i < n; i++) {
            emergencyList.push(
                <List.Item extra={emergencyMobiles[i]} key={i}>
                    {emergencyContacts[i]}
                </List.Item>
            );
        }
        return (
            <div className="order-show-container">
                <GroupInfo travelRoute={orderInfoData.travelRoute}
                    travelGroup={orderInfoData.travelGroup}
                    orderInfo={orderInfo}
                    history={this.state.data.history}/>
                <div className="item-title">出行人</div>
                <div className="travellers-container">
                    {
                        travellerList.length
                        ? <div className="traveller-show">
                            {travellerList}
                        </div>
                        : <List><List.Item>未选择出行人</List.Item></List>
                    }
                </div>
                <div className="item-title">睡友</div>
                <div className="roommate-container">
                    <List>
                        {
                            orderInfo.roommate == null || orderInfo.roommate
                            ? <List.Item
                                extra={<Switch checked={true} disabled/>}>
                                随机同性拼房
                            </List.Item> 
                            : roommateList
                        }
                    </List>
                </div>
                <div className="item-title">紧急联系人</div>
                <div className="emergency-container">
                    <div className="emergency-show">
                        <List>
                            {
                                emergencyList.length == 0
                                ? <List.Item>未设置紧急联系人</List.Item>
                                : emergencyList
                            }
                        </List>
                    </div>
                </div>
                <div className="item-title">优惠政策</div>
                <div className="discount-container">
                    <List>
                        {
                            orderInfoData.policy
                            ? <List.Item extra={orderInfoData.policy.value}>
                                {orderInfoData.policy.desc}
                            </List.Item>
                            : null
                        }
                        {
                            orderInfoData.student
                            ? <List.Item extra={
                                priceUtil.getPriceStr(
                                    priceUtil.getPrice(orderInfoData.student.value) 
                                        * orderInfoData.orderInfo.studentCount
                                )
                            }>
                                {orderInfoData.student.desc}
                            </List.Item>
                            : null
                        }
                        {
                            orderInfoData.code
                            ? <List.Item extra={orderInfoData.code.value}>
                                优惠码
                            </List.Item>
                            : null
                        }
                        <List.Item extra={priceUtil.getOrderDiscountPrice1(orderInfoData)}>
                            总共优惠
                        </List.Item>
                    </List>
                </div>
                <OrderRefund orderInfo={orderInfo} orderRefound={orderInfoData.orderRefound}/>
                <Footer orderid={orderInfo.orderid} actualPrice={orderInfo.actualPrice}
                    orderInfo={orderInfo}/>
            </div>
        );
    }

});

var OrderRefund = React.createClass({

    render: function() {
        var status = this.props.orderInfo.status;
        var orderRefound = this.props.orderRefound;
        if (orderRefound == null 
            || (status != orderStatus.REFUNDING && status != orderStatus.REFUNDED)) {
            return null;
        } 
        return (
            <div>
                <div className="item-title">退款</div>
                <div className="order-refund-container">
                    <List>
                        <List.Item extra={refundStatus.getDesc(orderRefound.status)}>当前状态</List.Item>
                        <List.Item extra={refundType.getDesc(orderRefound.type)}>退款策略</List.Item>
                        <List.Item extra={this.props.orderInfo.actualPrice}>实际支付</List.Item>
                        <List.Item extra={orderRefound.refund}>退款金额</List.Item>
                        <List.Item extra={orderRefound.desc}>退款原因</List.Item>
                    </List>
                </div>
            </div>
        );
    }
});

module.exports = OrderShow;
