/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { List, Modal } from 'antd-mobile';

import { url, orderType, defaultValue } from 'config';
import Rabbit from 'rabbit';
import Title from 'title';

import t1 from '../img/t1.png';
import t2 from '../img/t2.png';
import t3 from '../img/t3.png';
import t4 from '../img/t4.png';
import t5 from '../img/t5.png';

var OrderBrief = Rabbit.create(url.orderBrief);
var DiscountCode = Rabbit.create(url.discountCode);
var AccountContacts = Rabbit.create(url.contacts);

var Mine = React.createClass({

    mixins: [
        Reflux.connect(OrderBrief.store, 'data'),
        Reflux.connect(DiscountCode.store, 'discountCode'),
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    // callback method

    onDiscountCodesClick: function() {
        window.location.href = '/account/wdiscount';
    },

    onContactsClick: function() {
        window.location.href = '/account/wcontact';
    },



    // component specs

    getInitialState: function() {
        OrderBrief.actions.load();
        DiscountCode.actions.load();
        AccountContacts.actions.load();
        return {
            'data': {
                'status': 1,
                'briefOrders': [],
                'currentOrderCount': 0,
                'historyOrderCount': 0,
                'allOrderCount': 0
            },
            'discountCode': {
                'discountCodes': []
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
                    <List.Item arrow="horizontal" thumb={t3} onClick={this.onDiscountCodesClick}
                        extra={this.state.discountCode.discountCodes.length}>
                        优惠券
                    </List.Item>
                    <List.Item arrow="horizontal" thumb={t4} onClick={this.onContactsClick}>
                        出行人
                    </List.Item>
                </List>
                <List>
                    <List.Item thumb={t5} onClick={()=>{this.setState({'hotline': true})}}>
                        联系客服
                    </List.Item>
                    <Modal
                        title="客服电话"
                        closable
                        maskClosable
                        transparent
                        onClose={()=>{this.setState({'hotline': false})}}
                        visible={this.state.hotline}>
                        联系海逍遥请拨打：{defaultValue.hotline}
                    </Modal>
                </List>
            </div>
        );
    }
});

module.exports = Mine;
