/**
 * @author xiezhenzong 
 */
import React from 'react';

import { List, Button, Popup, Checkbox, Icon, WingBlank } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;

import { priceUtil, orderStatus } from 'config';

import GroupInfo from './group';
import Traveller from './traveller';
import Roommate from './roommate';
import SelectEmergency from './emergency';
import Discount from './discount';
import Agreement from './agreement';
import Footer from './footer';

var  OrderShow = React.createClass({

    _split: function(value) {
        return value == null ? [] : value.split(';');
    },

    _getTotalDiscount: function(orderInfoData) {
        var totalDiscount = 0;
        if (orderInfoData.policy != null) {
            totalDiscount += priceUtil.getPrice(orderInfoData.policy.value);
        }
        if (orderInfoData.code != null) {
            totalDiscount += priceUtil.getPrice(orderInfoData.code.value);
        }
        if (orderInfoData.student != null) {
            totalDiscount += priceUtil.getPrice(orderInfoData.student.value) * orderInfoData.orderInfo.studentCount;
        }
        return totalDiscount;
    },

    render: function () {
        var orderInfoData = this.props.orderInfoData;
        var travellerList = orderInfoData.orderTravellers.map(function(traveller, index) {
            return (
                <Traveller traveller={traveller} key={index} readOnly/>
            );
        });
        var roommateList = orderInfoData.orderTravellers.map(function(traveller, index) {
            return (
                <List.Item extra={traveller.roommate}>
                    {traveller.name}
                </List.Item>
            );
        });
        var emergencyList = [];
        var emergencyContacts = this._split(orderInfoData.orderInfo.emergencyContact);
        var emergencyMobiles = this._split(orderInfoData.orderInfo.emergencyMobile);
        for (var i = 0, n = emergencyContacts.length; i < n; i++) {
            emergencyList.push(
                <List.Item extra={emergencyMobiles[i]}>
                    {emergencyContacts[i]}
                </List.Item>
            );
        }
        var totalDiscount = this._getTotalDiscount(orderInfoData);
        return (
            <div className="order-form-container">
                <GroupInfo travelRoute={orderInfoData.travelRoute}
                    travelGroup={orderInfoData.travelGroup}/>
                <div className="order-status-container">
                    {orderStatus.getDesc(orderInfoData.orderInfo.status)}
                </div>
                <div className="travellers-container">
                    <WingBlank>
                        <h3>出行人</h3>
                        <div className="traveller-show">
                            {travellerList}
                        </div>
                    </WingBlank>
                </div>
                <div className="roommate-container">
                    <WingBlank>
                        <h3>睡友选择</h3>
                    </WingBlank>
                    <List>
                        <CheckboxItem disable 
                            checked={orderInfoData.orderInfo.roommate}>
                            服从组织安排
                        </CheckboxItem>
                        {
                            roommateList.length
                            ? roommateList
                            : <List.Item>未进行睡友设置，海逍遥为您随机同性拼房</List.Item>
                        }
                    </List>
                </div>
                <div className="emergency-container">
                    <WingBlank>
                        <h3>紧急联系人</h3>
                    </WingBlank>
                    <div className="emergency-show">
                        {
                            emergencyList.length == 0
                            ? null
                            : <List>
                                {emergencyList}
                            </List>
                        }
                    </div>
                </div>
                <div className="discount-container">
                    <WingBlank>
                        <h3>优惠政策</h3>
                    </WingBlank>
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
                        {
                            totalDiscount
                            ? <List.Item extra={priceUtil.getPriceStr(totalDiscount)}>
                                总共优惠
                            </List.Item>
                            : null
                        }
                    </List>
                </div>
                <div className="order-refund-container">
                </div>
                <div className="order-operation-container">
                </div>
            </div>
        );
    }

});

module.exports = OrderShow;