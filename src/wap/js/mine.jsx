/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';

import { url, orderType, defaultValue } from 'config';
import Rabbit from 'rabbit';
import Title from 'title';

var OrderBrief = Rabbit.create(url.orderBrief);
var DiscountCode = Rabbit.create(url.discountCode);
var AccountContacts = Rabbit.create(url.contacts);
var Mine = React.createClass({

    mixins: [
        Reflux.connect(OrderBrief.store, 'data'),
        Reflux.connect(DiscountCode.store, 'discountCode'),
        Reflux.connect(AccountContacts.store, 'contacts')
    ],

    getInitialState: function() {
        OrderBrief.actions.load({'orderType': orderType.CURRENT});
        DiscountCode.actions.load();
        AccountContacts.actions.load();
        return {
            'data': {
                'status': 1,
                'briefOrders': [],
                'currentOrderCount': 0,
                'historyOrderCount': 0
            },
            'discountCode': {
                'discountCodes': []
            },
            'contacts': {
                'contacts': []
           },
        };
    },

    render: function() {
        var accountInfo = this.props.basicInfo.accountInfo;
        var data = this.state.data;
        if (data.status != 0) {
            return (
                <div>
                    <p>订单查询失败, 请联系客服： {defaultValue.hotline}</p>
                </div>
            );
        }
        return (
            <div className="mine-container">
                <div className="mine-header">
                    <Image href="#" alt="32x32" responsive circle
                        src={accountInfo.avatarUrl} />
                    <p>{accountInfo.name ? accountInfo.name : accountInfo.nickname}</p>
                </div>
                <div className="mine-order">
                    <Title title="我的行程" className="mine-order-title">
                        <a href="javascript:">查看全部</a>
                    </Title>
                    <span className="bar">当前：</span>
                    <span className="order-count">{data.currentOrderCount}</span>
                    <span className="bar">历史：</span>
                    <span className="order-count">{data.historyOrderCount}</span>
                    <span className="bar">所有：</span>
                    <span className="order-count">{data.allOrderCount}</span>
                </div>
                <div className="mine-block">
                    <h3>
                        我的优惠券
                        <span className="mine-count pull-right">
                            {this.state.discountCode.discountCodes.length}
                        </span>
                    </h3>
                </div>
                <div className="mine-block">
                    <h3>
                        出行人
                        <span className="mine-count pull-right">
                            {this.state.contacts.contacts.length}
                        </span>
                    </h3>
                </div>
                <div className="mine-block">
                    <h3>联系客服</h3>
                </div>
            </div>
        );
    }
});

module.exports = Mine;
