/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { List, Modal } from 'antd-mobile';
var alert = Modal.alert;

import { url, orderType, defaultValue } from 'config';
import Rabbit from 'rabbit';
import Title from 'title';

import t1 from '../img/t1.png';
import t2 from '../img/t2.png';
import t3 from '../img/t3.png';
import t4 from '../img/t4.png';
import t5 from '../img/t5.png';
import f from '../img/F.png';

var OrderBrief = Rabbit.create(url.orderBrief);
var Coupons = Rabbit.create(url.coupons);
var AccountContacts = Rabbit.create(url.contacts);

var Mine = React.createClass({

    mixins: [
        Reflux.connect(OrderBrief.store, 'data'),
        Reflux.connect(Coupons.store, 'coupons'),
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    // callback method

    onCouponsClick: function() {
        window.location.href = '/account/wcoupon';
    },

    onContactsClick: function() {
        window.location.href = '/account/wcontact';
    },

    onHotlineClick: function() {
        alert('客服', `联系海逍遥请拨打：${defaultValue.hotline}`, [
            { text: '确定', onPress: () => {}},
        ]);
    },

    // component specs

    getInitialState: function() {
        OrderBrief.actions.load();
        Coupons.actions.load({'usebale': true, 'onlyCount': true});
        AccountContacts.actions.load();
        return {
            'data': {
                'status': 1,
                'briefOrders': [],
                'currentOrderCount': 0,
                'historyOrderCount': 0,
                'allOrderCount': 0
            },
            'coupons': {
                'coupons': [],
                'count': 0
            },
            'contacts': {
                'contacts': []
            },
            'hotline': false
        };
    },

    render: function() {
        var accountInfo = this.props.basicInfo.accountInfo;
        var data = this.state.data;
        return (
            <div className="mine-container">
                <div className="mine-header">
                    <img href="#" alt="32x32" src={accountInfo.avatarUrl} className="img-responsive img-circle" />
                    <p>{accountInfo.nickname}</p>
                </div>
                <div className="mine-order row">
                    <List>
                        <List.Item arrow="horizontal" thumb={t1} onClick={()=>{this.props.onOrdersClick(orderType.CURRENT)}}>
                            我的行程
                        </List.Item>
                    </List>
                    <div className="Athird bar" onClick={()=>{this.props.onOrdersClick(orderType.CURRENT)}}>当前：
                        <span className="order-count">{data.currentOrderCount}</span>
                    </div>
                    <div className="Athird bar" onClick={()=>{this.props.onOrdersClick(orderType.HISTORY)}}>历史：
                        <span className="order-count">{data.historyOrderCount}</span>
                    </div>
                    <div className="Athird bar" onClick={()=>{this.props.onOrdersClick(orderType.VISIBLE)}}>所有：
                        <span className="order-count">{data.allOrderCount}</span>
                    </div>
                </div>
                <List>
                    <List.Item arrow="horizontal" thumb={t2} onClick={this.props.onAccountEditClick}>
                        个人信息
                    </List.Item>
                    <List.Item arrow="horizontal" thumb={f} onClick={this.onCouponsClick}
                        extra={this.state.coupons.count}>
                        优惠券
                    </List.Item>
                    <List.Item arrow="horizontal" thumb={t4} onClick={this.onContactsClick}>
                        出行人
                    </List.Item>
                </List>
                <List>
                    <List.Item thumb={t5}
                        extra={
                            <a href={`tel:${defaultValue.hotline}`}>
                                {defaultValue.hotline}
                            </a>
                        }>
                        联系客服
                    </List.Item>
                </List>
            </div>
        );
    }
});

module.exports = Mine;
