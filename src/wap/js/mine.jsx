/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';
import { Icon } from 'antd';

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

    // callback method

    onAccountEditClick: function() {
        this.props.onAccountEditClick();
    },

    onOrdersClick: function() {
        this.props.onOrdersClick();
    },

    // component specs

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
            }
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
                <div className="mine-order row">
                    <div className="mine-order-title">
                        <h3 className="t1">
                            我的行程
                            <a href="javascript:" onClick={this.onOrdersClick} className="pull-right">查看全部<Icon type="right" /></a>
                        </h3>
                    </div>
                    <div className="Athird bar">当前：{data.currentOrderCount}</div>
                    <div className="Athird bar">历史：{data.historyOrderCount}</div>
                    <div className="Athird bar">所有：{data.allOrderCount}</div>
                </div>
                <div className="mine-block" href="javascript:" onClick={this.onAccountEditClick}>
                    <h3 className="t2">
                        个人信息
                        <a className="right">
                            <Icon type="right" />
                        </a>
                    </h3>
                </div>
                <div className="mine-block">
                    <h3 className="t3">
                        我的优惠券
                        <a href="/account/wdiscount" className="right">
                            <span className="mine-count">{this.state.discountCode.discountCodes.length}</span><Icon type="right" />
                        </a>
                    </h3>
                </div>
                <div className="mine-block">
                    <h3 className="t4">
                        出行人
                        <a href="/account/wcontact" onClick={this.onContactsClick} className="right">
                            <span className="mine-count"></span><Icon type="right" />
                        </a>
                    </h3>
                </div>
                <div className="mine-block">
                    <h3 className="t5">联系客服</h3>
                </div>
            </div>
        );
    }
});

module.exports = Mine;
