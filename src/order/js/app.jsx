/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Progress } from 'antd';
const ProgressLine = Progress.Line;

import AccountBasicInfo from 'account_basicinfo';
import { defaultValue, url, orderStatus } from 'config';
import Rabbit from 'rabbit';
import OrderForm from './order_form';
import OrderShow from './order_show';

import 'antd/lib/index.css';

var OrderInfo = Rabbit.create(url.orderOrder);

var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(OrderInfo.store, 'data')
    ],

    // compoment specs

    getInitialState: function() {
        AccountBasicInfo.actions.get();
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
        if (accountInfo == null || data.status != 0) {
            return (
                <div>
                    <ProgressLine percent={50}/>
                </div>
            );
        }
        return (
            <div className="order-container">
                {
                    data.orderInfo.status === orderStatus.NEW
                    ? <OrderForm accountInfo={accountInfo} orderInfoData={this.state.data}/>
                    : <OrderShow orderInfoData={this.state.data}/>
                }
            </div>
        );
    }
});

module.exports = App;
