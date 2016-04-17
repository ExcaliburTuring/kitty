/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import AccountOrders from 'account_orders';

var Orders = React.createClass({

    mixins: [Reflux.connect(AccountOrders.store, 'data')],

    getInitialState: function() {
        return {
            'data': {
                'status': 1,
                'orders': [],
                'travellers': {}
            }
        }
    },

    componentDidMount: function() {
    	 AccountOrders.actions.get();
    },

    render: function() {
        var data = this.state.data;
        if (data.status != 0) {
            return (
                <div>
                    <p>订单查询失败, 请联系客服： 15001028030</p>
                </div>
            );
        }
        var orders = data.orders;
        var travellers = data.travellers;
        var ordersList = orders.map(function(order) {
        	var traveller = travellers[order.orderid];
            return (
                <Item order={order} travellers={traveller} key={order.orderid}/>
            );
        });
        return (
            <div className="container"> 
                {ordersList}
            </div>
        );
    }
});

var Item = React.createClass({

    render: function() {
        var order = this.props.order;
        var travellers = this.props.travellers;
        return (
            <div className="order-container">
            	<div>
                    <p>订单id: {order.orderid}</p>
                </div>
                <div>
                    <p>账户id: {order.accountid}</p>
                </div>
                <div>
                    <p>团id: {order.groupid}</p>
                </div>
                <div>
                    <p>状态: {order.status}</p>
                </div>
                <div>
                    <p>人数: {order.count}</p>
                </div>
                <div>
                    <p>价格: {order.price}</p>
                </div>
                <div>
                    <p>实际价格: {order.actualPrice}</p>
                </div>
                <div>
                    <p>是否签订协议: {order.isArgeementOk}</p>
                </div>
            </div>
        );
    }
});

module.exports = Orders;
