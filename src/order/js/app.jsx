/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Button } from 'react-bootstrap';

import GroupBrief from './group';
import Travellers from './travellers';
import Emergency from './emergency';
import Roommate from './roommate';
import Discount from './Discount'; 
import NoAuth from './noauth';
import AccountOrders from 'account_orders';

var App = React.createClass({

    mixins: [Reflux.connect(AccountOrders.store, 'data')],

    getInitialState: function() {
        return {
           'data': {
                'status': 1,
                'orders': [],
                'staffs': {}
            }
        }
    },

    componentDidMount: function() {
        var orderid = window.location.pathname.split('/')[2];
        AccountOrders.actions.get();
    },

    render: function() {
        var data = this.state.data;
        if (data.status != 0) {
            if (data.status == 3) {
                return <NoAuth />
            }
            return (
                <div>
                    <p>订单查询失败, 请联系客服： 15001028030</p>
                </div>
            );
        }
        var groupid = 1;
        var mockOrder = data.orders[1]; // 假装只取到一个订单，因为应该是有orderid的，
        var agreement = mockOrder.isArgeementOk ? '已经同意XXX协议' : '同意XXX协议';
        return (
            <div className="container">
                <GroupBrief groupid={groupid}/>
                <Travellers />
                <Emergency />
                <Roommate />
                <Discount />
                <p>{agreement}</p>
                <Button bsStyle="primary" bsSize="large" type="submit">确认付款</Button>
            </div>
        );
    }
});

module.exports = App;
