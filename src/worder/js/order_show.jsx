/**
 * @author xiezhenzong 
 */
import React from 'react';

import { List, Button, Popup, Checkbox, Icon } from 'antd-mobile';
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
                <List.Item extra={traveller.roommate ? traveller.roommate : '未设置'} 
                    key={index}>
                    {traveller.name}
                </List.Item>
            );
        });
        var emergencyList = [];
        var emergencyContacts = this._split(orderInfoData.orderInfo.emergencyContact);
        var emergencyMobiles = this._split(orderInfoData.orderInfo.emergencyMobile);
        for (var i = 0, n = emergencyContacts.length; i < n; i++) {
            emergencyList.push(
                <List.Item extra={emergencyMobiles[i]} key={i}>
                    {emergencyContacts[i]}
                </List.Item>
            );
        }
        var totalDiscount = this._getTotalDiscount(orderInfoData);
        return (
            <div className="order-form-container">
                <GroupInfo travelRoute={orderInfoData.travelRoute}
                    travelGroup={orderInfoData.travelGroup}/>
                <div className="item-title">出行人</div>
                <div className="travellers-container">
                    <div className="traveller-show">
                        {travellerList}
                    </div>
                </div>
                <div className="item-title">睡友</div>
                <div className="roommate-container">
                    <List>
                        {
                            orderInfoData.orderInfo.roommate
                            ? <CheckboxItem disable checked={true}>
                                随机同性拼房
                            </CheckboxItem>
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