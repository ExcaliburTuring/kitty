/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { ActivityIndicator } from 'antd-mobile';

import AccountBasicInfo from 'account_basicinfo';
import { defaultValue, url, orderStatus } from 'config';
import Rabbit from 'rabbit';
import OrderForm from './order_form';
import OrderShow from './order_show';

var OrderInfo = Rabbit.create(url.orderOrder);

var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(OrderInfo.store, 'data')
    ],

    onAccountInfoChange: function() {
        AccountBasicInfo.actions.load();
    },

    // compoment specs

    getInitialState: function() {
        AccountBasicInfo.actions.load();
        var orderid = window.location.pathname.split('/')[2];
        OrderInfo.actions.load({'orderid': orderid});
        return {
            'basicInfo': {},
            'data': {
                'status': -1,
                'orderInfo': {},
                'travelRoute': {},
                'travelGroup': {},
                'orderTravellers': [],
                'code': {},
                'student': {},
                'orderRefound': {}
            }
        }
    },

    render: function() {
        var accountInfo = this.state.basicInfo.accountInfo;
        var data = this.state.data;
        if (data.status < 0) {
            return (
                <div className="order-loading-container">
                     <ActivityIndicator size="large" text="加载订单中..."/>
                </div>
            );
        }
        if (data.status != 0) {
            return (
                <div className="order-loading-container">
                    <p>订单加载异常，请联系海逍遥：{defaultValue.hotline}</p>
                </div>
            );
        }
        return (
            <div className="order-container">
                {
                    data.orderInfo.status === orderStatus.NEW
                    ? <OrderForm accountInfo={accountInfo} orderInfoData={this.state.data}
                        onAccountInfoChange={this.onAccountInfoChange}/>
                    : <OrderShow orderInfoData={this.state.data}/>
                }
            </div>
        );
    }
});

module.exports = App;
